import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import LanguageText from "./LanguageText";
import { useTranslation } from "react-i18next";

interface SkipButtonProps {
	skipText?: string;
	onPress: () => void;
}

export const SkipButton: React.FC<SkipButtonProps> = ({
	skipText,
	onPress,
}) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.skipButton}>
			{skipText ? (
				<Text style={styles.skipText}>{skipText}</Text>
			) : (
				<LanguageText translationKey={"skip"} style={styles.skipText} />
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	skipButton: {
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 15,
		paddingVertical: 10,
		zIndex: 1,
	},
	skipText: {
		fontSize: 18,
		color: "#4652cc",
	},
});
