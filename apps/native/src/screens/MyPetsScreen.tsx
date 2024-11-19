import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome6";
import LanguageRowView from "src/components/LanguageView";
import { useAuth } from "src/context/AuthContext";

export default function MyPetsScreen() {
	const [hasPets, setHasPets] = useState(true);
	const { user } = useAuth();

	if ((!user || user.pets.length === 0) && hasPets) {
		setHasPets(false);
	}

	return (
		<View>
			<LanguageRowView style={styles.header}>
				<Icon name="arrow-left-long" style={styles.headerButton} />
				<Text style={styles.headerText}>My Pets</Text>
				<Icon name="plus" style={styles.headerButton} />
			</LanguageRowView>
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
		backgroundColor: "#F8F7FB",
	},
	cardsContainer: {
		flex: 1,
		backgroundColor: "#F8F7FB",
		padding: 10,
		width: "100%",
		height: "100%",
	},
});
