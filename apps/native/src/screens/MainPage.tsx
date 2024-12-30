import React, { useRef, useState, useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	TextInput,
	Dimensions,
	Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import ServiceButton from "../components/ServiceButton";
import { useAuth } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { RootStackParamList } from "../types/types";
import { useFooterContext } from "src/context/FooterContext";

const { width } = Dimensions.get("window");

const MainPage = () => {
	const { setIsVisible } = useFooterContext();
	setIsVisible(true);

	const [showSearch, setShowSearch] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const searchWidth = useRef(new Animated.Value(40)).current;
	const { user } = useAuth();
	const { totalItemCount } = useContext(CartContext);
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const toggleSearch = () => {
		if (showSearch) {
			Animated.timing(searchWidth, {
				toValue: 40,
				duration: 300,
				useNativeDriver: false,
			}).start(() => {
				setShowSearch(false);
				setSearchQuery("");
			});
		} else {
			setShowSearch(true);
			Animated.timing(searchWidth, {
				toValue: width * 0.8,
				duration: 300,
				useNativeDriver: false,
			}).start();
		}
	};

	const handleServicePress = (label: string) => {
		switch (label) {
			case "My Store":
				navigation.navigate("MyStore");
				break;
			case "My Pets":
				navigation.navigate("MyPets");
				break;
			case "Products":
				navigation.navigate("ProductListScreen");
				break;
			case "Pet Stores":
				navigation.navigate("StoreListScreen", {
					storeType: "PET_STORE",
				});
				break;
			case "Vet Stores":
				navigation.navigate("StoreListScreen", {
					storeType: "VET_STORE",
				});
			default:
				console.log("Service Pressed", `You pressed ${label}`);
		}
	};

	const services = [
		{
			image: require("../../assets/my-pets.png"),
			label: "My Pets",
			redirection: "MyPets",
		},
		// { image: require("../../assets/grooming.png"), label: "Grooming" },
		// { image: require("../../assets/pet-store.png"), label: "Pet Store" },
		// { image: require("../../assets/pet-sitter.png"), label: "Pet Sitter" },
		// {
		// 	image: require("../../assets/info-graphics.png"),
		// 	label: "Info-graphics",
		// },
		{
			image: require("../../assets/my-store.png"),
			label: "My Store",
			redirection: "MyStore",
		},
		{ image: require("../../assets/pet-taxi.png"), label: "Products" },
		{ image: require("../../assets/pet-date.png"), label: "Vet Stores" },
		{ image: require("../../assets/adoption.png"), label: "Pet Stores" },
	];

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={toggleSearch}
					style={styles.iconButton}
				>
					<Icon
						name={showSearch ? "arrow-back" : "search"}
						size={24}
						color="#000"
					/>
				</TouchableOpacity>

				<Animated.View
					style={[styles.searchContainer, { width: searchWidth }]}
				>
					{showSearch && (
						<TextInput
							style={styles.searchInput}
							placeholder="Search..."
							value={searchQuery}
							onChangeText={setSearchQuery}
							autoFocus
							returnKeyType="search"
							onSubmitEditing={() =>
								console.log("Search Query:", searchQuery)
							}
						/>
					)}
				</Animated.View>

				{totalItemCount > 0 && (
					<TouchableOpacity
						onPress={() => navigation.navigate("CartScreen")}
						style={styles.cartButton}
					>
						<Icon name="cart" size={24} color="#000" />
						<View style={styles.cartBadge}>
							<Text style={styles.cartBadgeText}>
								{totalItemCount}
							</Text>
						</View>
					</TouchableOpacity>
				)}
			</View>
			<ScrollView
				contentContainerStyle={styles.servicesContainer}
				showsVerticalScrollIndicator={false}
			>
				<Text style={styles.title}>
					What are you looking for,{" "}
					<Text style={styles.highlightedText}>
						{user?.firstName || "User"}?
					</Text>
				</Text>
				<View style={styles.servicesGrid}>
					{services.map((service, index) => (
						<ServiceButton
							key={index}
							image={service.image}
							label={service.label}
							onPress={() => handleServicePress(service.label)}
						/>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F0F4F8",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		padding: 20,
		paddingTop: 60,
		backgroundColor: "#FFFFFF",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	title: {
		fontSize: 34,
		fontWeight: "600",
		color: "#1F2937",
		marginVertical: 40,
	},
	highlightedText: {
		color: "#FFCF6F",
	},
	headerIcons: {
		flexDirection: "row",
	},
	iconButton: {
		padding: 8,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F3F4F6",
		borderRadius: 20,
		paddingHorizontal: 10,
		marginLeft: 10,
	},
	searchInput: {
		flex: 1,
		height: 40,
		marginLeft: 10,
	},
	servicesContainer: {
		padding: 20,
	},
	servicesGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	cartButton: {
		marginLeft: "auto",
		padding: 8,
		position: "relative",
	},
	cartBadge: {
		position: "absolute",
		right: 0,
		top: 0,
		backgroundColor: "#6C63FF",
		borderRadius: 10,
		width: 20,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	cartBadgeText: {
		color: "white",
		fontSize: 12,
		fontWeight: "bold",
	},
});

export default MainPage;
