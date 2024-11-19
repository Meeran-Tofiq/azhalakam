import Icon from "react-native-vector-icons/FontAwesome6";
import LanguageRowView from "./LanguageView";
import { Text } from "react-native-elements";
import { StyleSheet } from "react-native";

interface HeaderProps {
	title: string;
}

export default function Header({ title }: HeaderProps) {
	return (
		<LanguageRowView style={styles.header}>
			<Icon name="arrow-left-long" style={styles.backButton} />
			<Text style={styles.headerText}>{title}</Text>
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
		borderBottomColor: "#aaa",
		borderBottomWidth: 1,
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
