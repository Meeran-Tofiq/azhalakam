import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome6";
import LanguageRowView from "src/components/LanguageView";
import PetCard from "src/components/PetCard";
import { useAuth } from "src/context/AuthContext";
import useApiClient from "src/hooks/useApiClient";
import { GetAllUserPetsResponse } from "../../../api/dist/src/types/Pet";

export default function MyPetsScreen() {
	const [hasPets, setHasPets] = useState(true);
	const [pets, setPets] = useState<GetAllUserPetsResponse["pets"]>();
	const apiClient = useApiClient();

	async function getAllPets() {
		const data = await apiClient.petApi.getAllPetsOfUser();
		setPets(data.pets);
	}

	useEffect(() => {
		getAllPets();
	}, []);
	const { user } = useAuth();

	if ((!user || user?.pets.length === 0) && hasPets) {
		setHasPets(false);
	}

	return (
		<View style={styles.container}>
			<LanguageRowView style={styles.header}>
				<Icon name="arrow-left-long" style={styles.headerButton} />
				<Text style={styles.headerText}>My Pets</Text>
				<Icon name="plus" style={styles.headerButton} />
			</LanguageRowView>

			{pets ? (
				<View style={styles.cardsContainer}>
					{pets.map((pet) => (
						<PetCard pet={pet} key={pet.id} />
					))}
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
	header: {
		padding: 20,
		marginTop: 20,
		width: "100%",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottomColor: "#aaa",
		borderBottomWidth: 1,
	},
	headerText: {
		fontSize: 20,
		fontWeight: "bold",
	},
	headerButton: {
		color: "#4552CB",
		fontSize: 20,
	},
	container: {
		flex: 1,
	},
	cardsContainer: {
		flex: 1,
		padding: 10,
		width: "100%",
		height: "100%",
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
});
