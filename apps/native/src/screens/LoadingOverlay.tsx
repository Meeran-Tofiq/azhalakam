import React from "react";
import { View, StyleSheet } from "react-native";
import LoadingScreen from "./LoadingScreen"; // The animation component you implemented
import { useLoading } from "src/context/LoadingContext";

const LoadingOverlay: React.FC = () => {
	const { isLoading } = useLoading();

	if (!isLoading) return null;

	return (
		<View style={styles.overlay}>
			<LoadingScreen />
		</View>
	);
};

const styles = StyleSheet.create({
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1000,
	},
});

export default LoadingOverlay;
