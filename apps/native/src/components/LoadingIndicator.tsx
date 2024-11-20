import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

interface LoadingIndicatorProps {
	size?: "small" | "large";
	color?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
	size = "large",
	color = "#4652CC",
}) => {
	return (
		<View style={styles.loadingContainer}>
			<ActivityIndicator size={size} color={color} />
		</View>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default LoadingIndicator;
