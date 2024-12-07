import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigation/Navigation";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/i18n";
import { LanguageDirectionProvider } from "./src/context/LanguageDirectionContext";
import Footer from "src/components/Footer";
import { FooterProvider } from "src/context/FooterContext";
import { CartProvider } from "src/context/CartContext";
import { LoadingProvider } from "src/context/LoadingContext";
import LoadingOverlay from "src/screens/LoadingOverlay";

export default function Native() {
	i18n.changeLanguage("en");
	return (
    <LoadingProvider>
		  <CartProvider>
			  <I18nextProvider i18n={i18n}>
				  <LanguageDirectionProvider>
					  <FooterProvider>
						  <Navigation />
						  <LoadingOverlay />
						  <Footer />
						  <StatusBar style="auto" />
					  </FooterProvider>
				  </LanguageDirectionProvider>
			  </I18nextProvider>
		  </CartProvider>
		</LoadingProvider>
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
