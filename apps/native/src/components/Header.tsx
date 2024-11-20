import React from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import LanguageRowView from "./LanguageView";
import { Text } from "react-native-elements";
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import ThreeDotsMenu from "./ThreeDotsMenu";
import BackButton from "./BackButton";

interface HeaderProps {
	title: string;
	headerStyle?: ViewStyle;
	textStyle?: TextStyle;
	backButtonStyle?: any;
	showThreeDots?: boolean;
	menuItems?: {
		label: string;
		onPress: () => void;
		icon?: string;
		labelColor?: string;
	}[];
	threeDotsStyles?: {
		iconStyle?: object;
		modalStyle?: object;
		itemStyle?: object;
		containerStyle?: object;
	};
}

export default function Header({
	title,
	headerStyle,
	textStyle,
	backButtonStyle,
	showThreeDots = false,
	menuItems = [],
	threeDotsStyles,
}: HeaderProps) {
	return (
		<LanguageRowView style={[styles.header, headerStyle]}>
			<BackButton
				buttonStyle={styles.backButton}
				iconStyle={backButtonStyle}
			/>
			<Text style={[styles.headerText, textStyle]}>{title}</Text>
			{showThreeDots && (
				<View style={styles.threeDots}>
					<ThreeDotsMenu menuItems={menuItems} {...threeDotsStyles} />
				</View>
			)}
		</LanguageRowView>
	);
}

const styles = StyleSheet.create({
	header: {
		padding: 20,
		marginTop: 20,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	headerText: {
		fontSize: 20,
		fontWeight: "bold",
	},
	backButton: {
		position: "absolute",
		left: 20,
	},
	threeDots: {
		position: "absolute",
		right: 20,
	},
});
