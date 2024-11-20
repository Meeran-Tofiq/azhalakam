import React from "react";
import { StyleSheet, ScrollView, Dimensions, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useApiClient from "../hooks/useApiClient";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../types/types";
import validationRules from "../validation/validationRules";
import GradientBackground from "../components/GradientBackground";
import RegisterPrompt from "../components/RegisterPrompt";
import CustomForm from "src/components/CustomForm";
import FormFieldConfig from "src/types/FormFieldConfig";

const { height } = Dimensions.get("window");

const inputs: FormFieldConfig[] = [
	{
		name: "usernameOrEmail",
		label: "Username or Email",
		keyboardType: "default",
	},
	{
		name: "password",
		label: "Password",
		secureTextEntry: true,
	},
];

function LoginScreen() {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const apiClient = useApiClient();
	const { login } = useAuth();

	const onSubmit = async (data: any) => {
		try {
			let response;
			if (data.usernameOrEmail.includes("@")) {
				response = await apiClient.userApi.loginWithEmail(
					data.usernameOrEmail,
					data.password
				);
			} else {
				response = await apiClient.userApi.loginWithUsername(
					data.usernameOrEmail,
					data.password
				);
			}

			await login(response);

			Alert.alert("Login Successful", "Welcome back!", [
				{
					text: "OK",
					onPress: () => navigation.replace("MainPage"),
				},
			]);
		} catch (error: any) {
			Alert.alert(
				"Login Failed",
				error.message || "Invalid credentials. Please try again."
			);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<GradientBackground />

			<CustomForm
				fields={inputs}
				onSubmit={onSubmit}
				validationRules={validationRules}
				submitButtonTitle="signIn"
				title="Sign In"
			/>

			<RegisterPrompt />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: "#F0F4F8",
	},
	contentContainer: {
		marginTop: height * 0.1,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#fff",
	},
	formContainer: {
		width: "100%",
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 20,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5,
		marginBottom: 20,
	},
	button: {
		backgroundColor: "#468ae6",
		borderRadius: 28,
		width: "100%",
		paddingVertical: 15,
	},
	link: {
		color: "#4A90E2",
		fontWeight: "bold",
	},
});

export default LoginScreen;
