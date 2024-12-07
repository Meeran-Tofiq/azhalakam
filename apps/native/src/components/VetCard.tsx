import { StyleSheet, View } from "react-native";
import { VetWithIncludes } from "../../../api/dist/src/types/Vet";
import { Text } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

interface VetCardProps {
	vet: VetWithIncludes;
}

export default function VetCard({ vet }: VetCardProps) {
	return (
		<View style={styles.cardContainer}>
			<LinearGradient
				colors={["#4552CB", "#4596EA"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={styles.gradient}
			/>
			<Text style={styles.text}>{"Dr. " + vet.name}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		width: "100%",
		height: 75,
		position: "relative",
		borderRadius: 10,
		padding: 5,
		justifyContent: "center",
		overflow: "hidden",
	},
	gradient: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	text: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
		textShadowColor: "#000",
		textAlign: "center",
	},
});
