import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PetStoreCreationScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Pet Store Creation Page</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F0F4F8",
	},
	text: {
		fontSize: 20,
		color: "#1F2937",
	},
});

export default PetStoreCreationScreen;
