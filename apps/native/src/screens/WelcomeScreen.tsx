import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import NextButton from "../components/NextButton";
import { SkipButton } from "../components/SkipButton";
import LanguageRowView from "../components/LanguageView";
import { useTranslation } from "react-i18next";
import TranslationKeys from "../types/translations";

const WelcomeScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const { t } = useTranslation();

	const [currentPage, setCurrentPage] = useState(0);
	const images = [
		require("../../assets/Welcome_Image_1.png"),
		require("../../assets/Welcome_Image_2.png"),
		require("../../assets/Welcome_Image_3.png"),
	];

	const pages = [
		{
			title: t("onboarding.0.title"),
			description: t("onboarding.0.description"),
			image: images[0],
		},
		{
			title: t("onboarding.1.title"),
			description: t("onboarding.1.description"),
			image: images[1],
		},
		{
			title: t("onboarding.2.title"),
			description: t("onboarding.2.description"),
			image: images[2],
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
			<LanguageRowView style={styles.skipContainer}>
				<SkipButton onPress={skipOnboarding}></SkipButton>
			</LanguageRowView>

			<Image source={pages[currentPage].image} style={styles.image} />

			<Text style={styles.title}>{pages[currentPage].title}</Text>
			<Text style={styles.text}>{pages[currentPage].description}</Text>

			<LanguageRowView style={styles.pagination}>
				{pages.map((_, index) => (
					<View
						key={index}
						style={[
							styles.dot,
							{ opacity: index === currentPage ? 1 : 0.3 },
						]}
					/>
				))}
			</LanguageRowView>

			<NextButton
				onPress={nextPage}
				isLastPage={currentPage === pages.length - 1}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	skipContainer: {
		width: "100%",
		justifyContent: "flex-end",
	},
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
});

export default WelcomeScreen;
