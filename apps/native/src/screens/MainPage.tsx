import React, { useRef, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	TextInput,
	Dimensions,
	Alert,
	Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import Footer from "../components/Footer";
import ServiceButton from "../components/ServiceButton";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../types/types";

const { width } = Dimensions.get("window");

const MainPage = () => {
	const [showSearch, setShowSearch] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const searchWidth = useRef(new Animated.Value(40)).current;
	const { user } = useAuth();
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

	const services = [
		{ image: require("../../assets/my-pets.png"), label: "My Pets" },
		{ image: require("../../assets/grooming.png"), label: "Grooming" },
		{ image: require("../../assets/pet-store.png"), label: "Pet Store" },
		{ image: require("../../assets/pet-sitter.png"), label: "Pet Sitter" },
		{
			image: require("../../assets/info-graphics.png"),
			label: "Info-graphics",
		},
		{ image: require("../../assets/training.png"), label: "Training" },
		{ image: require("../../assets/pet-taxi.png"), label: "Pet Taxi" },
		{ image: require("../../assets/pet-date.png"), label: "Pet Date" },
		{ image: require("../../assets/adoption.png"), label: "Adoption" },
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
			</View>
			<Text style={styles.title}>
				What are you looking for,{" "}
				<Text style={styles.highlightedText}>
					{user?.firstName || "User"}?
				</Text>
			</Text>
			<ScrollView
				contentContainerStyle={styles.servicesContainer}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.servicesGrid}>
					{services.map((service, index) => (
						<ServiceButton
							key={index}
							image={service.image}
							label={service.label}
						/>
					))}
				</View>
			</ScrollView>
			<Footer />
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
		marginHorizontal: 40,
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
});

export default MainPage;
