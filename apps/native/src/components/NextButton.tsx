import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

interface NextButtonProps {
	onPress: () => void;
	isLastPage: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ onPress, isLastPage }) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={styles.button}
			accessibilityRole="button"
		>
			<Text style={styles.buttonText}>
				{isLastPage ? "Get started" : "Next"}
			</Text>
		</TouchableOpacity>
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
