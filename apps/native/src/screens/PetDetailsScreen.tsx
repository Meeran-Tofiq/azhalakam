import { RouteProp, useRoute } from "@react-navigation/native";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import GradientBackground from "src/components/GradientBackground";
import Header from "src/components/Header";
import { RootStackParamList } from "src/types/types";
import { formatDate } from "src/utils/dateFormatter";

type PetDetailsScreenRouteProp = RouteProp<RootStackParamList, "PetDetails">;

function capitalizeFirstLetter(val: string) {
	return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export default function PetDetailsScreen() {
	const route = useRoute<PetDetailsScreenRouteProp>();
	const { pet, imageSource, color } = route.params;
	if (!pet) throw new Error("No pet provided for this page.");

	const formattedDateOfBirth = pet.dateOfBirth
		? formatDate(pet.dateOfBirth as Date)
		: "Hasn't been set yet";
	const formattedDateOfLastVisit = pet.lastVetVisit
		? formatDate(pet.lastVetVisit as Date)
		: "Hasn't been been to the vet yet. (Yay!)";

	const petInformation = [
		{ data: pet.notes || "Hasn't been set yet.", title: "Notes: " },
		{ data: pet.gender || "Hasn't been set yet.", title: "Gender: " },
		{ data: formattedDateOfBirth, title: "Date of Birth: " },
		{ data: formattedDateOfLastVisit, title: "Last Vet Visit: " },
	];

	return (
		<>
			<View style={styles.container}>
				<GradientBackground />
				<Header title={pet.name} textStyle={{ color: "white" }} />

				<View style={styles.contentContainer}>
					<ImageBackground
						source={imageSource}
						style={styles.backgroundImage}
					>
						<Text style={[styles.imageText, { color }]}>
							{"NAME: " + pet.name}
						</Text>
						{pet.species && (
							<Text style={[styles.imageText, { color }]}>
								{"SPECIES: " +
									capitalizeFirstLetter(
										pet.species
											?.toLocaleLowerCase()
											.replace("-", " ")
									)}
							</Text>
						)}
					</ImageBackground>

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