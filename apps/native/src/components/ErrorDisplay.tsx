import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ErrorDisplayProps {
	message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
	return (
		<View style={styles.errorContainer}>
			<Text style={styles.errorText}>{message}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	errorText: {
		fontSize: 18,
		color: "#FF3B30",
		textAlign: "center",
	},
});

export default ErrorDisplay;
