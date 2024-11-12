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
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import FormInput from "../components/FormInput";
import useApiClient from "../hooks/useApiClient";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../types/types";
import validationRules from "../validation/validationRules";
import GradientBackground from "../components/GradientBackground";
import RegisterPrompt from "../components/RegisterPrompt";
import LanguageText from "../components/LanguageText";
import LanguageButton from "../components/LanguageButton";

const { height } = Dimensions.get("window");

function LoginScreen() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [focusedInputs, setFocusedInputs] = useState<{
		[key: string]: boolean;
	}>({});
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const apiClient = useApiClient();
	const { login } = useAuth();

	const handleFocus = (field: string) => {
		setFocusedInputs({ ...focusedInputs, [field]: true });
	};

	const handleBlur = (field: string) => {
		setFocusedInputs({ ...focusedInputs, [field]: false });
	};

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

			<View style={styles.contentContainer}>
				<LanguageText translationKey={"signIn"} style={styles.title} />

				<View style={styles.formContainer}>
					<FormInput
						control={control}
						name="usernameOrEmail"
						label="Username or Email"
						rules={validationRules.usernameOrEmail}
						errors={errors}
						focused={focusedInputs["usernameOrEmail"]}
						onFocus={() => handleFocus("usernameOrEmail")}
						onBlur={() => handleBlur("usernameOrEmail")}
					/>

					<FormInput
						control={control}
						name="password"
						label="Password"
						rules={validationRules.password}
						errors={errors}
						focused={focusedInputs["password"]}
						onFocus={() => handleFocus("password")}
						onBlur={() => handleBlur("password")}
						secureTextEntry={true}
					/>

					<LanguageButton
						title="signIn"
						style={styles.button}
						onPress={handleSubmit(onSubmit)}
					/>
				</View>

				<RegisterPrompt />
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

export default LoginScreen;
