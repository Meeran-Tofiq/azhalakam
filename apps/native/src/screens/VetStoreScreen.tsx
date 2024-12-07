import Header from "src/components/Header";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "src/types/types";
import { ScrollView, StyleSheet, View } from "react-native";
import GradientBackground from "src/components/GradientBackground";
import { Button, Text } from "react-native-elements";
import images from "src/utils/imageImporter";
import BackgroundImageWithTextOnTop from "src/components/BackgroundImageWithTextOnTop";
import useApiClient from "src/hooks/useApiClient";
import { VetStoreWithIncludes } from "../../../api/dist/src/types/VetStore";
import { useEffect, useState } from "react";
import VetCard from "src/components/VetCard";
import PopUpForm from "src/components/PopUpForm";
import FormFieldConfig from "src/types/FormFieldConfig";

type VetStoreScreenRouteProp = RouteProp<RootStackParamList, "VetStoreScreen">;

const bookingFields: FormFieldConfig[] = [
	{
		label: "Date",
		name: "date",
		keyboardType: "default",
		isDate: true,
	},
	{
		label: "Duration",
		name: "duration",
		keyboardType: "numeric",
	},
];

export default function VetStoreScreen() {
	const [popUpFormVisible, setPopupFormVisible] = useState(false);
	const [vetStore, setVetStore] = useState<VetStoreWithIncludes | undefined>(
		undefined
	);
	const route = useRoute<VetStoreScreenRouteProp>();
	const { store } = route.params;

	const apiClient = useApiClient();

	if (!store) return null;

	const image =
		store.type === "VET_STORE" ? images.vetStore : images.petStore;

	useEffect(() => {
		async function loadVetStoreData() {
			try {
				const { vetStore } =
					await apiClient.storeApi.vetStoreApi.getVetStoreFromId({
						id: store?.vetStore?.id || "",
						storeId: store.id,
					});

				setVetStore(vetStore);
			} catch (error) {
				console.error(error);
			}
		}

		loadVetStoreData();
	}, [store]);

	async function bookAnAppoinment(data: any) {
		try {
			await apiClient.appointmentApi.createAppointment({
				appointment: {
					date: data.date,
					duration: Number(data.duration),
					vetStoreId: store?.vetStore?.id || "",
				},
			});

			setPopupFormVisible(false);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<ScrollView>
				<PopUpForm
					fields={bookingFields}
					visible={popUpFormVisible}
					onSubmit={bookAnAppoinment}
					submitButtonTitle="Book"
					title="Book an appointment"
					validationRules={{}}
					onClose={() => setPopupFormVisible(false)}
				/>
				<GradientBackground />
				<Header
					title={store.name}
					textStyle={{ color: "white" }}
					backButtonStyle={{ color: "white" }}
				/>

				<View style={styles.container}>
					<BackgroundImageWithTextOnTop
						imageSource={image}
						texts={[store.name]}
						shouldHaveOverlay={false}
						backgroundImageStyle={styles.bannerImage}
						textStyle={{ color: "#4552CB" }}
					/>
					<View style={styles.infoContainer}>
						<Text style={styles.storeType}>
							{store.type.replace("_", " ")}
						</Text>
						{store.avgRating !== undefined && (
							<Text style={styles.storeRating}>
								{store.avgRating
									? `${store.avgRating.toFixed(1)}/5.0`
									: "No ratings yet"}
							</Text>
						)}
					</View>

					<View style={styles.vetsContainer}>
						<Text style={styles.vetsTitle}>Vets</Text>
						{vetStore &&
							vetStore.vets.length > 0 &&
							vetStore.vets.map((vet) => (
								<VetCard key={vet.id} vet={vet} />
							))}
					</View>
				</View>
				<View style={styles.appointmentBookingContainer}>
					<Button
						buttonStyle={styles.appointmentBookingButton}
						title="Book an Appointment"
						onPress={() => setPopupFormVisible(true)}
					/>
				</View>
			</ScrollView>
			{popUpFormVisible && <View style={styles.popUpShadow}></View>}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: "#fff",
		borderRadius: 10,
		elevation: 2,
		flex: 1,
		margin: 20,
		gap: 5,
	},
	bannerImage: {
		borderRadius: 10,
	},
	logoContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	logoImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		alignSelf: "flex-start",
		borderWidth: 3,
		borderColor: "#fff",
		marginLeft: 15,
	},
	infoContainer: {
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "space-around",
	},
	storeName: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#1F2937",
		textAlign: "center",
	},
	storeType: {
		fontSize: 16,
		color: "#4B5563",
		marginTop: 5,
		textAlign: "center",
	},
	storeRating: {
		fontSize: 16,
		color: "#4B5563",
		marginTop: 5,
		textAlign: "center",
	},
	vetsContainer: {
		gap: 10,
		marginTop: 20,
		borderTopColor: "#ccc",
		borderTopWidth: 1,
	},
	vetsTitle: {
		marginTop: 5,
		fontSize: 20,
		textAlign: "center",
		fontWeight: "bold",
	},
	appointmentBookingContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	appointmentBookingButton: {
		backgroundColor: "#4552CB",
		color: "#fff",
		padding: 15,
	},
	popUpShadow: {
		height: "100%",
		width: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		backgroundColor: "black",
		flex: 1,
		opacity: 0.5,
	},
});
