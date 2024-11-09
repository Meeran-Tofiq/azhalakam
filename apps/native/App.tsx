import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigation/Navigation";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/i18n";

export default function Native() {
	return (
		<I18nextProvider i18n={i18n}>
			<Navigation />
			<StatusBar style="auto" />
		</I18nextProvider>
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
