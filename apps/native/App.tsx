import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@repo/ui";
import Navigation from "./src/navigation/Navigation";

export default function Native() {
	return (
		<>
			<Navigation />
			<StatusBar style="auto" />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		fontWeight: "bold",
		marginBottom: 20,
		fontSize: 36,
	},
});
