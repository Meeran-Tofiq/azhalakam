// src/components/NavigationPrompt.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TranslationKeys from "../types/translations";
import LanguageText from "./LanguageText";
import LanguageRowView from "./LanguageView";

interface NavigationPromptProps {
	message: keyof TranslationKeys;
	linkText: keyof TranslationKeys;
	onPress: () => void;
}

const NavigationPrompt: React.FC<NavigationPromptProps> = ({
	message,
	linkText,
	onPress,
}) => {
	return (
		<LanguageRowView style={styles.container}>
			<LanguageText text={message} />
			<TouchableOpacity onPress={onPress}>
				<LanguageText text={linkText} style={styles.link} />
			</TouchableOpacity>
		</LanguageRowView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 20,
	},
	link: {
		color: "#4652cc",
		fontWeight: "bold",
		marginHorizontal: 5,
	},
});

export default NavigationPrompt;
