import React from "react";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import LanguageRowView from "./LanguageView";
import FooterIcon from "./FooterIcon";
import { FooterPageNames, useFooterContext } from "src/context/FooterContext";
import { navigate } from "src/navigation/NavigationService";

interface FooterPage {
	pageName: FooterPageNames;
	pageText: string;
	image: ImageSourcePropType | string;
}

const homeIcon: ImageSourcePropType = require("../../assets/home-icon.png");

const Footer = () => {
	const { activeIcon, isVisible, setActiveIcon } = useFooterContext();

	const getColor = (page: FooterPageNames) => {
		return activeIcon === page ? "#4552CB" : "#BBC3CE";
	};

	const footerPages: FooterPage[] = [
		{
			pageName: FooterPageNames.Home,
			pageText: "Home",
			image: homeIcon,
		},
		{
			pageName: FooterPageNames.Appointments,
			pageText: "Appointments",
			image: "calendar-outline",
		},
		{
			pageName: FooterPageNames.Profile,
			pageText: "Profile",
			image: "person-outline",
		},
	];

	const navigateTo = (screen: FooterPageNames, icon: FooterPageNames) => {
		setActiveIcon(icon);
		navigate(screen as string);
	};

	return (
		<LanguageRowView
			style={isVisible ? styles.footer : { display: "none" }}
		>
			{footerPages.map(({ pageName, pageText, image }) => (
				<FooterIcon
					key={pageName}
					pageText={pageText}
					onPress={() => navigateTo(pageName, pageName)}
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
