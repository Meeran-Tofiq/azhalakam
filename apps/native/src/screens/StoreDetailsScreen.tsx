import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import useApiClient from "../hooks/useApiClient";
import GenericButton from "../components/GenericButton";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import StoreCard from "../components/StoreCard";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorDisplay from "../components/ErrorDisplay";
import { useFocusEffect } from "@react-navigation/native";

type StoreDetailsRouteProp = RouteProp<RootStackParamList, "StoreDetails">;

interface Store {
	id: string;
	name: string;
	type: "PET_STORE" | "VET_STORE";
	bannerImage?: string;
	logoImage?: string;
	avgRating?: number;
}

const StoreDetailsScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const route = useRoute<StoreDetailsRouteProp>();
	const { storeId } = route.params;
	const apiClient = useApiClient();
	const [store, setStore] = useState<Store | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

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

	return (
		<ScrollView style={styles.container}>
			<Header
				title="Store Details"
				actionButton={{
					label: "Edit",
					iconName: "pencil",
					onPress: () =>
						navigation.navigate("StoreEdit", { storeId }),
					style: styles.editButton,
				}}
			/>

			<StoreCard store={store} />
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
