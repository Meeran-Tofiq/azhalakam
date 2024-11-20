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
		const petData: UpdatePetInputs["updateData"] = {
			name: data.name,
			species: data.species,
			gender: data.gender,
			weight: data.weight ? Number(data.weight) : undefined,
			notes: data.notes,
			dateOfBirth: data.dateOfBirth
				? new Date(data.dateOfBirth)
				: undefined,
			lastVetVisit: data.lastVetVisit
				? new Date(data.lastVetVisit)
				: undefined,
		};

		try {
			const { pet: updatedPet } = await apiClient.petApi.updatePet({
				updateData: petData,
				id: pet.id,
			});

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
				submitButtonTitle="Update Pet"
				title="Update Pet"
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
