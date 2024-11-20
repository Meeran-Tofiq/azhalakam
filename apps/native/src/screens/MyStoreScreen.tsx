import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import useApiClient from "../hooks/useApiClient";
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from "../components/BackButton";
import GenericButton from "../components/GenericButton";

const MyStoreScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const apiClient = useApiClient();
	const [store, setStore] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchStore();
	}, []);

	const fetchStore = async () => {
		try {
			const storeData = await apiClient.storeApi.getAllStoresOfUser();
			if (storeData.stores.length > 0) {
				setStore(storeData.stores[0]);
			}
		} catch (error) {
			console.error("Error fetching store:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleCreateStore = () => {
		navigation.navigate("StoreCreation");
	};

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<BackButton />
				<Text style={styles.headerTitle}>My Store</Text>
				{store ? (
					<GenericButton
						style={styles.headerButton}
						onPress={() =>
							navigation.navigate("StoreDetails", {
								storeId: store.id,
							})
						}
						label="View Store"
					>
						<Icon name="eye" size={24} color="#fff" />
					</GenericButton>
				) : (
					<GenericButton
						style={styles.headerButton}
						onPress={handleCreateStore}
						label="Create Store"
					>
						<Icon name="add" size={24} color="#fff" />
					</GenericButton>
				)}
			</View>

			{store ? (
				<View style={styles.storeContainer}>
					<Image
						source={
							store.bannerImage
								? { uri: store.bannerImage }
								: require("../../assets/placeholder-image.png")
						}
						style={styles.bannerImage}
					/>
					<Image
						source={
							store.logoImage
								? { uri: store.logoImage }
								: require("../../assets/placeholder-image.png")
						}
						style={styles.logoImage}
					/>
					<Text style={styles.storeName}>{store.name}</Text>
					<Text style={styles.storeType}>{store.type}</Text>
				</View>
			) : (
				<View style={styles.noStoreContainer}>
					<Text style={styles.noStoreText}>
						You don't have a store yet.
					</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F0F4F8",
		padding: 20,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 20,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#1F2937",
		flex: 1,
	},
	headerButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		borderRadius: 10,
	},
	storeContainer: {
		alignItems: "center",
	},
	bannerImage: {
		width: "100%",
		height: 150,
		resizeMode: "cover",
		borderRadius: 10,
		marginBottom: 20,
	},
	logoImage: {
		width: 100,
		height: 100,
		resizeMode: "cover",
		borderRadius: 50,
		marginBottom: 10,
	},
	storeName: {
		fontSize: 22,
		fontWeight: "600",
		color: "#1F2937",
	},
	storeType: {
		fontSize: 18,
		color: "#4B5563",
		marginBottom: 10,
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
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default MyStoreScreen;
