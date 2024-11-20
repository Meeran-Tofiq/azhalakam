import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	ActivityIndicator,
	Alert,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import useApiClient from "../hooks/useApiClient";
import BackButton from "../components/BackButton";
import GenericButton from "../components/GenericButton";
import Icon from "react-native-vector-icons/Ionicons";

// Define the route prop type for StoreDetails
type StoreDetailsRouteProp = RouteProp<RootStackParamList, "StoreDetails">;

// Define the type for store data
type StoreType = "PET_STORE" | "VET_STORE";

interface Store {
	id: string;
	name: string;
	type: StoreType;
	bannerImage?: string;
	logoImage?: string;
	petStore?: {
		petCategories: string;
	};
	vetStore?: {
		vetSpecialty: string;
	};
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

	useEffect(() => {
		fetchStoreDetails();
	}, [storeId]);

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
			navigation.goBack();
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#4652CC" />
			</View>
		);
	}

	if (!store) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>Store not found.</Text>
			</View>
		);
	}

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<BackButton />
				<Text style={styles.headerTitle}>Store Details</Text>
				<GenericButton
					style={styles.editButton}
					onPress={() =>
						navigation.navigate("StoreEdit", { storeId })
					}
					label="Edit"
				>
					<Icon name="pencil" size={24} color="#fff" />
				</GenericButton>
			</View>

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

				<View style={styles.infoContainer}>
					<Text style={styles.storeName}>{store.name}</Text>
					<Text style={styles.storeType}>
						{store.type.replace("_", " ")}
					</Text>

					{store.type === "PET_STORE" && store.petStore && (
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>
								Pet Categories
							</Text>
							<Text style={styles.sectionText}>
								{store.petStore.petCategories}
							</Text>
						</View>
					)}

					{store.type === "VET_STORE" && store.vetStore && (
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>Specialties</Text>
							<Text style={styles.sectionText}>
								{store.vetStore.vetSpecialty}
							</Text>
						</View>
					)}

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Rating</Text>
						<Text style={styles.sectionText}>
							{store.avgRating
								? `${store.avgRating.toFixed(1)}/5.0`
								: "No ratings yet"}
						</Text>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F0F4F8",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	errorText: {
		fontSize: 18,
		color: "#FF3B30",
		textAlign: "center",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		padding: 20,
		paddingTop: 40,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#E5E7EB",
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#1F2937",
		flex: 1,
		marginLeft: 15,
	},
	editButton: {
		padding: 10,
		backgroundColor: "#4652CC",
		borderRadius: 8,
	},
	storeContainer: {
		padding: 20,
		backgroundColor: "#fff",
	},
	bannerImage: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
		borderRadius: 10,
	},
	logoImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginTop: -50,
		alignSelf: "center",
		borderWidth: 3,
		borderColor: "#fff",
	},
	infoContainer: {
		marginTop: 20,
	},
	storeName: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#1F2937",
		textAlign: "center",
	},
	storeType: {
		fontSize: 16,
		color: "#4B5563",
		marginTop: 5,
		textAlign: "center",
	},
	section: {
		marginTop: 20,
		paddingHorizontal: 10,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#1F2937",
		marginBottom: 5,
	},
	sectionText: {
		fontSize: 16,
		color: "#4B5563",
	},
});

export default StoreDetailsScreen;
