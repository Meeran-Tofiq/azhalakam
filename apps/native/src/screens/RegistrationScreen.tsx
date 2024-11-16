import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Dimensions,
	Alert,
} from "react-native";
import { Button } from "react-native-elements";
import { useForm } from "react-hook-form";
import { LinearGradient } from "expo-linear-gradient";
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

const { height } = Dimensions.get("window");
const inputs: (keyof TranslationKeys)[] = [
	"username",
	"firstName",
	"lastName",
	"email",
	"phoneNumber",
	"password",
	"retypePassword",
];

function RegistrationScreen() {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { login } = useAuth();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [focusedInputs, setFocusedInputs] = useState<{
		[key: string]: boolean;
	}>({});
	const apiClient = useApiClient();

	const handleFocus = (field: string) => {
		setFocusedInputs({ ...focusedInputs, [field]: true });
	};

	const handleBlur = (field: string) => {
		setFocusedInputs({ ...focusedInputs, [field]: false });
	};

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
			await login(registerData);

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

			<View style={styles.contentContainer}>
				<LanguageText
					translationKey="registration"
					style={styles.title}
				/>

				<View style={styles.formContainer}>
					{inputs.map((field, index) => (
						<FormInput
							key={index}
							control={control}
							name={field as keyof TranslationKeys}
							label={
								field.charAt(0).toUpperCase() +
								field.slice(1).replace(/([A-Z])/g, " $1")
							}
							rules={
								validationRules[
									field as keyof typeof validationRules
								]
							}
							errors={errors}
							focused={focusedInputs[field]}
							onFocus={() => handleFocus(field)}
							onBlur={() => handleBlur(field)}
							secureTextEntry={field
								.toLowerCase()
								.includes("password")}
							keyboardType={
								field === "phoneNumber"
									? "numeric"
									: field === "email"
										? "email-address"
										: "default"
							}
						/>
					))}

					<LanguageButton
						title="register"
						style={styles.button}
						onPress={handleSubmit(onSubmit)}
					/>
				</View>

				<SignInPrompt />
			</View>
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

export default RegistrationScreen;
