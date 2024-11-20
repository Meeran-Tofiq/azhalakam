import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import useApiClient from "../hooks/useApiClient";
import GenericButton from "../components/GenericButton";
import Icon from "react-native-vector-icons/Ionicons";
import { useForm, SubmitHandler } from "react-hook-form";
import FormInput from "../components/FormInput";
import { Picker } from "@react-native-picker/picker";
import Header from "../components/Header";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorDisplay from "../components/ErrorDisplay";

type StoreEditRouteProp = RouteProp<RootStackParamList, "StoreEdit">;

type StoreType = "PET_STORE" | "VET_STORE";

interface Store {
	id: string;
	name: string;
	type: StoreType;
	bannerImage?: string;
	logoImage?: string;
	avgRating?: number;
}

interface FormValues {
	name: string;
	storeType: StoreType;
}

const StoreEditScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const route = useRoute<StoreEditRouteProp>();
	const { storeId } = route.params;
	const apiClient = useApiClient();
	const [store, setStore] = useState<Store | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [deleting, setDeleting] = useState<boolean>(false);

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			name: "",
			storeType: "PET_STORE",
		},
	});

	useEffect(() => {
		fetchStoreDetails();
	}, [storeId]);

	const fetchStoreDetails = async () => {
		try {
			const response = await apiClient.storeApi.getStoreFromId({
				id: storeId,
			});
			setStore(response.store);
			setValue("name", response.store.name);
			setValue("storeType", response.store.type);
		} catch (error: any) {
			Alert.alert(
				"Error",
				error.message || "Failed to fetch store details"
			);
			navigation.goBack();
		} finally {
			setLoading(false);
		}
	};

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			const { name, storeType } = data;

			const updatedStore = {
				name,
				type: storeType,
			};

			await apiClient.storeApi.updateStore({
				id: storeId,
				updateData: updatedStore,
			});

			Alert.alert("Success", "Store updated successfully!", [
				{
					text: "OK",
					onPress: () => navigation.goBack(),
				},
			]);
		} catch (error: any) {
			Alert.alert("Error", error.message || "Failed to update store.");
		}
	};

	const handleDeleteStore = () => {
		Alert.alert(
			"Confirm Deletion",
			"Are you sure you want to delete your store? This action cannot be undone.",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					style: "destructive",
					onPress: deleteStore,
				},
			]
		);
	};

	const deleteStore = async () => {
		setDeleting(true);
		try {
			await apiClient.storeApi.deleteStore({ id: storeId });
			Alert.alert("Deleted", "Your store has been deleted.", [
				{
					text: "OK",
					onPress: () => navigation.navigate("MyStore"),
				},
			]);
		} catch (error: any) {
			Alert.alert("Error", error.message || "Failed to delete store.");
		} finally {
			setDeleting(false);
		}
	};

	if (loading) {
		return <LoadingIndicator />;
	}

	if (!store) {
		return <ErrorDisplay message="Store not found." />;
	}

	return (
		<ScrollView style={styles.container}>
			<Header
				title="Edit Store"
				actionButton={{
					label: "Save",
					iconName: "save",
					onPress: handleSubmit(onSubmit),
					style: styles.saveButton,
				}}
			/>

			<View style={styles.formContainer}>
				<FormInput
					control={control}
					name="name"
					label="Store Name"
					rules={{ required: "Store name is required." }}
					errors={errors}
				/>

				<View style={styles.pickerContainer}>
					<Text style={styles.label}>Store Type</Text>
					<Picker
						selectedValue={store.type}
						onValueChange={(itemValue) => {
							setValue("storeType", itemValue as StoreType);
						}}
						style={styles.picker}
					>
						<Picker.Item label="Pet Store" value="PET_STORE" />
						<Picker.Item label="Vet Store" value="VET_STORE" />
					</Picker>
				</View>
			</View>

			<GenericButton
				onPress={handleDeleteStore}
				label="Delete Store"
				style={styles.deleteButton}
				disabled={deleting}
			>
				<Icon name="trash" size={24} color="#fff" />
			</GenericButton>
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
