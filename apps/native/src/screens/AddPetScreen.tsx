import { StyleSheet, View } from "react-native";
import GradientBackground from "src/components/GradientBackground";
import Header from "src/components/Header";
import PetForm from "src/components/PetForm";
import useApiClient from "src/hooks/useApiClient";
import { CreatePetInputs } from "../../../api/dist/src/types/Pet";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/types/types";

export default function AddPetScreen() {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const apiClient = useApiClient();

	async function onSubmit(data: any) {
		const petData: CreatePetInputs = {
			pet: {
				name: data.name,
				species: data.species,
				gender: data.gender,
				weight: Number(data.weight),
				notes: data.notes,
				dateOfBirth: new Date(data.dateOfBirth),
				lastVetVisit: new Date(data.lastVetVisit),
			},
			userId: "1",
		};

		try {
			const { pet } = await apiClient.petApi.createPet({
				pet: petData.pet,
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
				title="Add Pet"
				textStyle={{ color: "white" }}
				backButtonStyle={{ color: "white" }}
			/>

			<PetForm
				onSubmit={onSubmit}
				submitButtonTitle="Add Pet"
				title="Add Pet"
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
