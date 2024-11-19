import Icon from "react-native-vector-icons/FontAwesome6";
import LanguageRowView from "./LanguageView";
import { Text } from "react-native-elements";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface HeaderProps {
	title: string;
	headerStyle?: ViewStyle;
	textStyle?: TextStyle;
	backButtonStyle?: any;
}

export default function Header({
	title,
	headerStyle,
	textStyle,
	backButtonStyle,
}: HeaderProps) {
	return (
		<LanguageRowView style={[styles.header, headerStyle]}>
			<Icon
				name="arrow-left-long"
				style={[styles.backButton, backButtonStyle]}
			/>
			<Text style={[styles.headerText, textStyle]}>{title}</Text>
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
		color: "#4552CB",
		fontSize: 20,
		position: "absolute",
		left: 20,
	},
});
