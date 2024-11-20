import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions, Alert } from "react-native";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import useApiClient from "../hooks/useApiClient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../types/types";
import validationRules from "../validation/validationRules";
import GradientBackground from "../components/GradientBackground";
import SignInPrompt from "../components/SignInPrompt";
import LanguageText from "../components/LanguageText";
import TranslationKeys from "../types/translations";
import LanguageButton from "../components/LanguageButton";
import CustomForm from "src/components/CustomForm";
import FormFieldConfig from "src/types/FormFieldConfig";
import { useFooterContext } from "src/context/FooterContext";

const { height } = Dimensions.get("window");
const inputs: FormFieldConfig[] = [
	{
		name: "username",
		label: "Username",
		keyboardType: "default",
	},
	{
		name: "firstName",
		label: "First Name",
		keyboardType: "default",
	},
	{
		name: "lastName",
		label: "Last Name",
		keyboardType: "default",
	},
	{
		name: "email",
		label: "Email",
		keyboardType: "email-address",
	},
	{
		name: "phoneNumber",
		label: "Phone Number",
		keyboardType: "phone-pad",
	},
	{
		name: "password",
		label: "Password",
		secureTextEntry: true,
	},
	{
		name: "confirmPassword",
		label: "Confirm Password",
		secureTextEntry: true,
	},
];

function RegistrationScreen() {
	// set footer to not be visible
	const { setIsVisible } = useFooterContext();
	setIsVisible(false);

	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { login } = useAuth();
	const apiClient = useApiClient();

	const onSubmit = async (data: any) => {
		try {
			const registerData = {
				username: data.username,
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email.toLowerCase(),
				phoneNo: data.phoneNumber,
				password: data.password,
			};

			const response = await apiClient.userApi.register(registerData);
			await login(response);

			Alert.alert("Registration Successful", "Welcome!", [
				{
					text: "OK",
					onPress: () => navigation.replace("MainPage"),
				},
			]);
		} catch (error: any) {
			Alert.alert(
				"Registration Failed",
				error.message || "Something went wrong. Please try again."
			);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<GradientBackground />

			<CustomForm
				fields={inputs}
				title="registration"
				validationRules={validationRules}
				onSubmit={onSubmit}
				submitButtonTitle="register"
			/>

			<SignInPrompt />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: "#F0F4F8",
		paddingBottom: 10,
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

export default RegistrationScreen;
