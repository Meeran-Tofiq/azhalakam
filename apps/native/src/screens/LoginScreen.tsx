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
		} catch (error) {
			Alert.alert(
				"Login Failed",
				error.message || "Invalid credentials. Please try again."
			);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<LinearGradient
				colors={["#4552CB", "#4596EA"]}
				style={styles.topBackground}
				start={{ x: 1, y: 0 }}
				end={{ x: 0, y: 1 }}
			/>

			<View style={styles.contentContainer}>
				<Text style={styles.title}>Sign In</Text>

				<View style={styles.formContainer}>
					<FormInput
						control={control}
						name="usernameOrEmail"
						label="Username or Email"
						rules={{
							required: "Username or Email is required",
						}}
						errors={errors}
						focused={focusedInputs["usernameOrEmail"]}
						onFocus={() => handleFocus("usernameOrEmail")}
						onBlur={() => handleBlur("usernameOrEmail")}
					/>

					<FormInput
						control={control}
						name="password"
						label="Password"
						rules={{
							required: "Password is required",
						}}
						errors={errors}
						focused={focusedInputs["password"]}
						onFocus={() => handleFocus("password")}
						onBlur={() => handleBlur("password")}
						secureTextEntry={true}
					/>

					<Button
						title="Sign In"
						buttonStyle={styles.button}
						onPress={handleSubmit(onSubmit)}
					/>
				</View>

				<View style={styles.register}>
					<Text>Don't have an account yet? </Text>
					<TouchableOpacity
						onPress={() => navigation.navigate("Registration")}
					>
						<Text style={styles.link}>Register</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: "#F0F4F8",
	},
	topBackground: {
		height: height * 0.4,
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
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
	register: {
		flexDirection: "row",
		marginTop: 20,
	},
	link: {
		color: "#4A90E2",
		fontWeight: "bold",
	},
});

export default LoginScreen;
