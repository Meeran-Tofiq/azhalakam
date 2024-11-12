import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import LanguageButton from "./LanguageButton";

const screenWidth = Dimensions.get("window").width;

interface NextButtonProps {
	onPress: () => void;
	isLastPage: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ onPress, isLastPage }) => {
	return (
		<LanguageButton
			title={isLastPage ? "getStarted" : "next"}
			style={styles.button}
			textStyle={styles.buttonText}
			onPress={onPress}
		/>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#4652cc",
		height: 50,
		width: screenWidth * 0.8,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 30,
		marginBottom: 40,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
});

export default NextButton;
