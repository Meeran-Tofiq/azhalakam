import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import NextButton from "../components/NextButton";

const WelcomeScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const [currentPage, setCurrentPage] = useState(0);

	const pages = [
		{
			image: require("../../assets/Welcome_Image_1.png"),
			title: "Welcome to Pet Care",
			text: "All types of services for your pet in one place, instantly searchable.",
		},
		{
			image: require("../../assets/Welcome_Image_2.png"),
			title: "Proven experts",
			text: "We interview every specialist before they get to work.",
		},
		{
			image: require("../../assets/Welcome_Image_3.png"),
			title: "Reliable reviews",
			text: "A review can be left only by a user who used the service.",
		},
	];

	const skipOnboarding = () => {
		navigation.navigate("Registration");
	};

	// Handler to go to the next page
	const nextPage = () => {
		if (currentPage < pages.length - 1) {
			setCurrentPage(currentPage + 1);
		} else {
			skipOnboarding();
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={skipOnboarding}
				style={styles.skipButton}
			>
				<Text style={styles.skipText}>Skip</Text>
			</TouchableOpacity>

			<Image source={pages[currentPage].image} style={styles.image} />

			<Text style={styles.title}>{pages[currentPage].title}</Text>
			<Text style={styles.text}>{pages[currentPage].text}</Text>

			<View style={styles.pagination}>
				{pages.map((_, index) => (
					<View
						key={index}
						style={[
							styles.dot,
							{ opacity: index === currentPage ? 1 : 0.3 },
						]}
					/>
				))}
			</View>

			<NextButton
				onPress={nextPage}
				isLastPage={currentPage === pages.length - 1}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		padding: 20,
	},
	image: {
		width: 400,
		height: 400,
		resizeMode: "contain",
		marginBottom: 20,
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
	},
	text: {
		fontSize: 16,
		textAlign: "center",
		color: "#666",
		marginBottom: 20,
	},
	pagination: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 20,
		marginBottom: 20,
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "#efa94f",
		marginHorizontal: 5,
	},
	skipButton: {
		position: "absolute",
		top: 40,
		right: 20,
	},
	skipText: {
		marginTop: 12,
		fontSize: 18,
		color: "#4652cc",
	},
});

export default WelcomeScreen;
