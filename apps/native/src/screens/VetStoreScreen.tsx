import Header from "src/components/Header";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "src/types/types";
import { StyleSheet, View } from "react-native";
import GradientBackground from "src/components/GradientBackground";

type VetStoreScreenRouteProp = RouteProp<RootStackParamList, "VetStoreScreen">;

export default function VetStoreScreen() {
	const route = useRoute<VetStoreScreenRouteProp>();
	const { store } = route.params;

	if (!store) return null;

	return (
		<View>
			<GradientBackground />
			<Header
				title={store.name}
				textStyle={{ color: "white" }}
				backButtonStyle={{ color: "white" }}
			/>

			<View style={styles.container}></View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		width: "80%",
		backgroundColor: "white",
		borderRadius: 20,
		marginHorizontal: "auto",
		marginTop: 20,
	},
});
