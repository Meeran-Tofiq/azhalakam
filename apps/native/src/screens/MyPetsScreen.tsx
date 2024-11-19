import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome6";
import LanguageRowView from "src/components/LanguageView";
import PetCard from "src/components/PetCard";
import useApiClient from "src/hooks/useApiClient";
import { GetAllUserPetsResponse } from "../../../api/dist/src/types/Pet";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "src/types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "src/components/Header";

export default function MyPetsScreen() {
	const [isLoading, setIsLoading] = useState(true);
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const [pets, setPets] = useState<GetAllUserPetsResponse["pets"]>();
	const apiClient = useApiClient();

	async function getAllPets() {
		const data = await apiClient.petApi.getAllPetsOfUser();
		setPets(data.pets);
		setIsLoading(false);
	}

	useEffect(() => {
		setIsLoading(true);
		getAllPets();
	}, []);

	return (
		<View style={styles.container}>
			<Header title="My Pets" />

			{isLoading ? null : pets ? (
				<View style={styles.cardsContainer}>
					{pets.map((pet) => (
						<PetCard pet={pet} key={pet.id} />
					))}

					<Button
						title={"+ Add Pet"}
						buttonStyle={styles.addPetButton}
						titleStyle={styles.addPetButtonText}
						onPress={() => {
							navigation.navigate("AddPet");
						}}
					/>
				</View>
			) : (
				<View style={styles.noPetsTextContainer}>
					<Text style={styles.noPetsText}>
						You don't have any pets yet.
					</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	cardsContainer: {
		flex: 1,
		padding: 10,
		width: "100%",
		height: "100%",
		gap: 10,
	},
	noPetsTextContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	noPetsText: {
		fontSize: 20,
		color: "#aaa",
	},
	addPetButton: {
		backgroundColor: "#ddd",
	},
	addPetButtonText: {
		color: "#4552CB",
	},
});
