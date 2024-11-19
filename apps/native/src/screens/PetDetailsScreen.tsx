import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";
import { RootStackParamList } from "src/types/types";

export default function PetDetailsScreen() {
	const navidation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const pet = navidation.getState()?.routes[1]?.params?.pet;
    
	return <View></View>;
}
