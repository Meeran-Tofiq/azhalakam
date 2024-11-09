import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface SkipButtonProps {
	skipText: string;
	onPress: () => void;
}

export const SkipButton: React.FC<SkipButtonProps> = ({
	skipText,
	onPress,
}) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.skipButton}>
			<Text style={styles.skipText}>{skipText}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	skipButton: {
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 15,
		paddingVertical: 10,
		position: "absolute",
		right: 20,
		top: 40,
		zIndex: 1,
	},
	skipText: {
		fontSize: 18,
		color: "#4652cc",
	},
});
