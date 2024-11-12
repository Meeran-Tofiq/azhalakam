import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigation/Navigation";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/i18n";
import { LanguageDirectionProvider } from "./src/context/LanguageDirectionContext";

export default function Native() {
	i18n.changeLanguage("ckb");
	return (
		<I18nextProvider i18n={i18n}>
			<LanguageDirectionProvider>
				<Navigation />
				<StatusBar style="auto" />
			</LanguageDirectionProvider>
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
