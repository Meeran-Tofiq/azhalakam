// src/components/SignInPrompt.tsx
import React from "react";
import { useNavigation } from "@react-navigation/native"; // Make sure this is imported for navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import NavigationPrompt from "./NavigationPrompt";

interface SignInPromptProps {
	onPress?: () => void; // Optional, if you want to pass a custom onPress handler
}

const SignInPrompt: React.FC<SignInPromptProps> = ({ onPress }) => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<NavigationPrompt
			linkText="Sign in"
			message="Already have an account?"
			onPress={onPress || (() => navigation.navigate("Login"))}
		/>
	);
};

export default SignInPrompt;
