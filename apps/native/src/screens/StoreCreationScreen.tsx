import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import useApiClient from "../hooks/useApiClient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import Header from "../components/Header";
import StoreForm from "src/components/StoreForm";
import GradientBackground from "src/components/GradientBackground";
import { CreateStoreInputs } from "../../../api/dist/src/types/Store";

const StoreCreationScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const apiClient = useApiClient();

	const onSubmit = async (data: any) => {
		try {
			const { name, type } = data;

			const storeData: CreateStoreInputs["store"] = {
				name,
				type,
			};

			console.log(storeData);

			await apiClient.storeApi.createStore({
				store: storeData,
			});

			Alert.alert("Success", "Store created successfully!");
			navigation.goBack();
		} catch (error: any) {
			Alert.alert("Error", error.message || "Failed to create store.");
		}
	};

	return (
		<View style={styles.container}>
			<GradientBackground />

			<Header
				title="Create a Store"
				textStyle={{ color: "white" }}
				backButtonStyle={{ color: "white" }}
			/>

			<StoreForm
				onSubmit={onSubmit}
				submitButtonTitle="Create a Store"
				title="Create a Store"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: "#F0F4F8",
	},
	content: {
		flex: 1,
		marginTop: 40,
		marginHorizontal: 20,
	},
	title: {
		fontSize: 24,
		color: "#1F2937",
		marginBottom: 20,
		textAlign: "center",
		fontWeight: "bold",
	},
	pickerContainer: {
		marginVertical: 10,
	},
	label: {
		fontSize: 16,
		color: "#1F2937",
		marginBottom: 5,
	},
	picker: {
		height: 50,
		width: "100%",
		backgroundColor: "#fff",
		borderRadius: 5,
	},
	submitButton: {
		marginTop: 20,
		backgroundColor: "#4652CC",
		padding: 15,
		borderRadius: 5,
		alignItems: "center",
	},
});

export default StoreCreationScreen;
