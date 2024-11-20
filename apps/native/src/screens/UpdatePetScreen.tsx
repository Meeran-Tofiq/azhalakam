import { StyleSheet, View } from "react-native";
import GradientBackground from "src/components/GradientBackground";
import Header from "src/components/Header";
import PetForm from "src/components/PetForm";
import useApiClient from "src/hooks/useApiClient";
import { UpdatePetInputs } from "../../../api/dist/src/types/Pet";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/types/types";

type PetDetailsScreenRouteProp = RouteProp<RootStackParamList, "PetDetails">;

export default function UpdatePetScreen() {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const apiClient = useApiClient();

	const route = useRoute<PetDetailsScreenRouteProp>();
	const { pet } = route.params;
	if (!pet) throw new Error("No pet provided for this page.");

	async function onSubmit(data: any) {
		// const updateData: UpdatePetInputs["updateData"];
		const petData: UpdatePetInputs = {
			id: pet.id,
			updateData: {
				name: data.name,
				species: data.species,
				gender: data.gender,
				weight: Number(data.weight),
				notes: data.notes,
				dateOfBirth: new Date(data.dateOfBirth),
				lastVetVisit: new Date(data.lastVetVisit),
			},
		};

		try {
			const { pet } = await apiClient.petApi.updatePet(petData);

			navigation.navigate("MyPets");
		} catch (error: any) {
			console.log(error);
		}
	}

	return (
		<View style={styles.container}>
			<GradientBackground />

			<Header
				title="Update Pet"
				textStyle={{ color: "white" }}
				backButtonStyle={{ color: "white" }}
			/>

			<PetForm
				onSubmit={onSubmit}
				title={"Update " + pet.name}
				submitButtonTitle={"Update " + pet.name}
				pet={pet}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: "white",
	},
});
