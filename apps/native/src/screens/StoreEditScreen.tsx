import React from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import useApiClient from "../hooks/useApiClient";
import Header from "../components/Header";
import ErrorDisplay from "../components/ErrorDisplay";
import StoreForm from "src/components/StoreForm";
import { UpdateStoreInputs } from "../../../api/dist/src/types/Store";
import GradientBackground from "src/components/GradientBackground";

type StoreEditRouteProp = RouteProp<RootStackParamList, "StoreEdit">;

const StoreEditScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const route = useRoute<StoreEditRouteProp>();
	const { store } = route.params;
	const apiClient = useApiClient();

	const onSubmit = async (data: UpdateStoreInputs["updateData"]) => {
		try {
			const { name, type } = data;

			const updatedStore = {
				name,
				type,
			};

			await apiClient.storeApi.updateStore({
				id: store.id,
				updateData: updatedStore,
			});

			Alert.alert("Success", "Store updated successfully!", [
				{
					text: "OK",
					onPress: () => navigation.navigate("MyStore"),
				},
			]);
		} catch (error: any) {
			Alert.alert("Error", error.message || "Failed to update store.");
		}
	};

	if (!store) {
		return <ErrorDisplay message="Store not found." />;
	}

	return (
		<ScrollView style={styles.container}>
			<GradientBackground />
			<Header title="Edit Store" />

			<StoreForm
				store={store}
				title={"Edit Store: " + store.name}
				submitButtonTitle="Save"
				onSubmit={onSubmit}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F0F4F8",
	},
	saveButton: {
		padding: 10,
		backgroundColor: "#4CAF50",
		borderRadius: 8,
	},
	formContainer: {
		padding: 20,
		backgroundColor: "#fff",
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
	deleteButton: {
		margin: 20,
		backgroundColor: "#FF3B30",
		padding: 15,
		borderRadius: 5,
		alignItems: "center",
	},
});

export default StoreEditScreen;
