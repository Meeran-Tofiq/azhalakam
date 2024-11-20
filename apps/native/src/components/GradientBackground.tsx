// src/components/GradientBackground.tsx
import React from "react";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient from expo-linear-gradient
import { Dimensions, StyleSheet, ViewStyle } from "react-native";

const { height } = Dimensions.get("window");

interface GradientBackgroundProps {
	style?: ViewStyle;
	colors?: readonly [string, string, ...string[]];
	start?: { x: number; y: number };
	end?: { x: number; y: number };
}

/**
 * GradientBackground component
 *
 * By default it is set to take up the top 40% of the screen
 */
const GradientBackground: React.FC<GradientBackgroundProps> = ({
	style,
	colors = ["#4552CB", "#4596EA"], // Default colors
	start = { x: 1, y: 0 }, // Default start point
	end = { x: 0, y: 1 }, // Default end point
}) => {
	return (
		<LinearGradient
			colors={colors}
			style={[styles.defaultStyle, style]} // Merge custom styles with default styles
			start={start}
			end={end}
		/>
	);
};

const styles = StyleSheet.create({
	defaultStyle: {
		flex: 1,
		height: height * 0.4,
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
	},
});

export default GradientBackground;
