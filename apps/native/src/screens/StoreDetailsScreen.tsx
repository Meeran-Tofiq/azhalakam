import React, { useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import useApiClient from "../hooks/useApiClient";
import Header from "../components/Header";
import StoreCard from "../components/StoreCard";
import ErrorDisplay from "../components/ErrorDisplay";
import DeletePopUp from "src/components/DeletePopUp";

type StoreDetailsRouteProp = RouteProp<RootStackParamList, "StoreDetails">;

const StoreDetailsScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const route = useRoute<StoreDetailsRouteProp>();
	const { store } = route.params;
	const apiClient = useApiClient();
	const [deleteVisible, setDeleteVisible] = useState(false);

	if (!store) {
		return <ErrorDisplay message="Store not found." />;
	}

	async function handleDeleteStore() {
		try {
			await apiClient.storeApi.deleteStore({
				id: store.id,
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
								store,
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
