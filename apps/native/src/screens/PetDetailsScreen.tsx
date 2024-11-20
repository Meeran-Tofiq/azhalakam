import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import BackgroundImageWithTextOnTop from "src/components/BackgroundImageWithTextOnTop";
import DeletePopUp from "src/components/DeletePopUp";
import GradientBackground from "src/components/GradientBackground";
import Header from "src/components/Header";
import useApiClient from "src/hooks/useApiClient";
import { RootStackParamList } from "src/types/types";
import { formatDate } from "src/utils/dateFormatter";
import { capitalizeFirstLetter } from "src/utils/stringHandler";

type PetDetailsScreenRouteProp = RouteProp<RootStackParamList, "PetDetails">;

export default function PetDetailsScreen() {
	const [deleteVisible, setDeleteVisible] = useState(false);

	const apiClient = useApiClient();
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const route = useRoute<PetDetailsScreenRouteProp>();
	const { pet, imageSource, color } = route.params;
	if (!pet) throw new Error("No pet provided for this page.");

	// format pet information to display
	const formattedDateOfBirth = pet.dateOfBirth
		? formatDate(pet.dateOfBirth as Date)
		: "Hasn't been set yet";
	const formattedDateOfLastVisit = pet.lastVetVisit
		? formatDate(pet.lastVetVisit as Date)
		: "Hasn't been been to the vet yet. (Yay!)";
	const petInformation = [
		{
			data: pet.weight + " kg" || "Hasn't been set yet.",
			title: "Weight: ",
		},
		{ data: pet.notes || "Hasn't been set yet.", title: "Notes: " },
		{ data: pet.gender || "Hasn't been set yet.", title: "Gender: " },
		{ data: formattedDateOfBirth, title: "Date of Birth: " },
		{ data: formattedDateOfLastVisit, title: "Last Vet Visit: " },
	];

	// format text to display on background image
	const textsOnBackgroundImage = [
		"Name: " + pet.name,
		"Species: " +
			capitalizeFirstLetter(
				pet.species?.toLocaleLowerCase().replace("-", " ")
			),
	];

	const handleEditOnPress = () => navigation.navigate("UpdatePet", { pet });
	const handleDeleteOnPress = () => {
		setDeleteVisible(true);
	};
	const handleDeletePet = async () => {
		try {
			apiClient.petApi.deletePet({ id: pet.id });
			navigation.navigate("MyPets");
		} catch (error) {
			Alert.alert("Error", "Something went wrong. Please try again.");
		}
	};

	return (
		<>
			<View style={styles.container}>
				<GradientBackground />
				<Header
					title={pet.name}
					textStyle={{ color: "white" }}
					menuItems={[
						{
							label: "Edit",
							onPress: handleEditOnPress,
							icon: "edit",
						},
						{
							label: "Delete",
							onPress: handleDeleteOnPress,
							icon: "trash",
							labelColor: "red",
						},
					]}
					showThreeDots={true}
				/>

				{deleteVisible && (
					<DeletePopUp
						title="Delete pet"
						description="Are you sure you want to delete this pet?"
						onDelete={handleDeletePet}
					/>
				)}

				<View style={styles.contentContainer}>
					<BackgroundImageWithTextOnTop
						imageSource={imageSource}
						shouldHaveOverlay={false}
						backgroundImageStyle={{ height: 200 }}
						textStyle={{ color: color }}
						texts={textsOnBackgroundImage}
					/>

					<View style={styles.infoContainer}>
						{petInformation.map((info) => (
							<View
								key={info.title}
								style={styles.petInfoContainer}
							>
								<Text style={styles.petInfoTitle}>
									{info.title}
								</Text>
								<Text>{info.data}</Text>
							</View>
						))}
					</View>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#eee",
	},
	contentContainer: {
		flex: 1,
		overflow: "hidden",
		borderRadius: 20,
		backgroundColor: "white",
	},
	infoContainer: {
		flex: 1,
		padding: 15,
	},
	backgroundImage: {
		width: "100%",
		height: 200,
		justifyContent: "flex-end",
	},
	imageText: {
		backgroundColor: "rgba(255, 255, 255, 0.85)",
		padding: 5,
		borderRadius: 15,
		marginBottom: 8,
		marginHorizontal: 15,
		textAlign: "center",
		maxWidth: "40%",
	},
	petInfoContainer: {
		justifyContent: "space-between",
		margin: 10,
	},
	petInfoTitle: {
		fontWeight: "bold",
		color: "#4552CB",
	},
});
