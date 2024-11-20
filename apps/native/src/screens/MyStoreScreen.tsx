import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import useApiClient from "../hooks/useApiClient";
import Icon from "react-native-vector-icons/Ionicons";
import GenericButton from "../components/GenericButton";
import Header from "../components/Header";
import StoreCard from "../components/StoreCard";
import LoadingIndicator from "../components/LoadingIndicator";

const MyStoreScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const apiClient = useApiClient();
	const [store, setStore] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	const fetchStore = async () => {
		try {
			const storeData = await apiClient.storeApi.getAllStoresOfUser();
			if (storeData.stores.length > 0) {
				setStore(storeData.stores[0]);
			} else {
				setStore(null);
			}
		} catch (error) {
			console.error("Error fetching store:", error);
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			setLoading(true);
			fetchStore();
		}, [])
	);

	const handleCreateStore = () => {
		navigation.navigate("StoreCreation");
	};

	if (loading) {
		return <LoadingIndicator />;
	}

	if (!store) {
		return (
			<View style={styles.container}>
				<Header title="My Store" />
				<View style={styles.noStoreContainer}>
					<Text style={styles.noStoreText}>
						You don't have a store yet.
					</Text>
					<GenericButton
						onPress={handleCreateStore}
						label="Create Store"
						style={styles.createButton}
					>
						<Icon name="add" size={24} color="#fff" />
					</GenericButton>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Header
				title="My Store"
				actionButton={{
					label: "View Store",
					iconName: "eye",
					onPress: () =>
						navigation.navigate("StoreDetails", {
							storeId: store.id,
						}),
					style: styles.headerButton,
				}}
			/>

			<StoreCard store={store} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F0F4F8",
	},
	headerButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		borderRadius: 10,
		backgroundColor: "#4652CC",
	},
	noStoreContainer: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	noStoreText: {
		fontSize: 18,
		color: "#4B5563",
		marginBottom: 20,
		textAlign: "center",
	},
	createButton: {
		backgroundColor: "#4652CC",
		padding: 15,
		borderRadius: 5,
		alignItems: "center",
	},
});

export default MyStoreScreen;
