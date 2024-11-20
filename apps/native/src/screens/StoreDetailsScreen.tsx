import React, { useState, useCallback } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import useApiClient from "../hooks/useApiClient";
import Header from "../components/Header";
import StoreCard from "../components/StoreCard";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorDisplay from "../components/ErrorDisplay";
import { useFocusEffect } from "@react-navigation/native";
import { StoreWithIncludes } from "../../../api/dist/src/types/Store";
import DeletePopUp from "src/components/DeletePopUp";

type StoreDetailsRouteProp = RouteProp<RootStackParamList, "StoreDetails">;

const StoreDetailsScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const route = useRoute<StoreDetailsRouteProp>();
	const { storeId } = route.params;
	const apiClient = useApiClient();
	const [store, setStore] = useState<StoreWithIncludes | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [deleteVisible, setDeleteVisible] = useState(false);

	const fetchStoreDetails = async () => {
		try {
			const response = await apiClient.storeApi.getStoreFromId({
				id: storeId,
			});
			setStore(response.store);
		} catch (error: any) {
			Alert.alert(
				"Error",
				error.message || "Failed to fetch store details"
			);
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			fetchStoreDetails();
		}, [storeId])
	);

	if (loading) {
		return <LoadingIndicator />;
	}

	if (!store) {
		return <ErrorDisplay message="Store not found." />;
	}

	async function handleDeleteStore() {
		try {
			await apiClient.storeApi.deleteStore({
				id: storeId,
			});
			Alert.alert("Success", "Store deleted successfully!");
			setDeleteVisible(false);
			navigation.goBack();
		} catch (error: any) {
			Alert.alert("Error", error.message || "Failed to delete store.");
		}
	}

	return (
		<ScrollView style={styles.container}>
			<Header
				title="Store Details"
				showThreeDots={true}
				menuItems={[
					{
						label: "Edit",
						onPress: () =>
							navigation.navigate("StoreEdit", {
								storeId: storeId,
							}),
						icon: "edit",
					},
					{
						label: "Delete",
						onPress: () => setDeleteVisible(true),
						icon: "trash",
						labelColor: "red",
					},
				]}
				threeDotsStyles={{
					iconStyle: {
						color: "#4652CC",
					},
				}}
			/>

			<StoreCard store={store} />

			{deleteVisible && (
				<DeletePopUp
					title="Delete pet"
					description="Are you sure you want to delete this pet?"
					onDelete={handleDeleteStore}
				/>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F0F4F8",
	},
	editButton: {
		padding: 10,
		backgroundColor: "#4652CC",
		borderRadius: 8,
	},
});

export default StoreDetailsScreen;
