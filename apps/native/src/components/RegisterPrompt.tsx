// src/components/SignInPrompt.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Make sure this is imported for navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import NavigationPrompt from "./NavigationPrompt";

interface RegisterPromptProps {
	onPress?: () => void; // Optional, if you want to pass a custom onPress handler
}

const RegisterPrompt: React.FC<RegisterPromptProps> = ({ onPress }) => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<NavigationPrompt
			linkText="Sign up"
			message="Don't have an account yet?"
			onPress={onPress || (() => navigation.navigate("Registration"))}
		/>
	);
};

export default RegisterPrompt;
