// src/components/NavigationPrompt.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface NavigationPromptProps {
	message: string;
	linkText: string;
	onPress: () => void;
}

const NavigationPrompt: React.FC<NavigationPromptProps> = ({
	message,
	linkText,
	onPress,
}) => {
	return (
		<View style={styles.container}>
			<Text>{message} </Text>
			<TouchableOpacity onPress={onPress}>
				<Text style={styles.link}>{linkText}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 20,
	},
	link: {
		color: "#4652cc",
		fontWeight: "bold",
	},
});

export default NavigationPrompt;
