import React from "react";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import LanguageRowView from "./LanguageView";
import FooterIcon from "./FooterIcon";

interface FooterPage {
	pageName: string;
	pageText: string;
	image: ImageSourcePropType | string;
}

const homeIcon: ImageSourcePropType = require("../../assets/home-icon.png");

const Footer = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const route = useRoute();

	const getColor = (page: string) => {
		return route.name === page ? "#4552CB" : "#BBC3CE";
	};

	const footerPages: FooterPage[] = [
		{
			pageName: "MainPage",
			pageText: "Home",
			image: homeIcon,
		},
		{
			pageName: "AppointmentsScreen",
			pageText: "Appointments",
			image: "calendar-outline",
		},
		{
			pageName: "ProfileScreen",
			pageText: "Profile",
			image: "person-outline",
		},
	];

	return (
		<LanguageRowView style={styles.footer}>
			{footerPages.map(({ pageName, pageText, image }) => (
				<FooterIcon
					key={pageName}
					pageText={pageText}
					onPress={() => navigation.navigate(pageName)}
					color={getColor(pageName)}
					image={image}
				></FooterIcon>
			))}
		</LanguageRowView>
	);
};

const styles = StyleSheet.create({
	footer: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingVertical: 10,
		backgroundColor: "#FFFFFF",
		borderTopWidth: 1,
		borderTopColor: "#E0E0E0",
	},
});

export default Footer;
