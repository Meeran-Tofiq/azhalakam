import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import PetCard from "src/components/PetCard";
import useApiClient from "src/hooks/useApiClient";
import { GetAllUserPetsResponse } from "../../../api/dist/src/types/Pet";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "src/types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "src/components/Header";
import { useLoading } from "src/context/LoadingContext";

export default function MyPetsScreen() {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const [pets, setPets] = useState<GetAllUserPetsResponse["pets"]>();
	const apiClient = useApiClient();
	const { setIsLoading } = useLoading();

	async function getAllPets() {
		setIsLoading(true);
		const data = await apiClient.petApi.getAllPetsOfUser();
		setPets(data.pets);
		setIsLoading(false);
	}

	useFocusEffect(
		useCallback(() => {
			getAllPets();

			return () => {};
		}, [])
	);

	return (
		<View style={styles.container}>
			<Header title="My Pets" />

			{pets ? (
				<ScrollView>
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
				</ScrollView>
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
