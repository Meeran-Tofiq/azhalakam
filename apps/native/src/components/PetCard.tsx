import { PetWithIncludes } from "@api-types/Pet";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
	ImageSourcePropType,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { RootStackParamList } from "src/types/types";
import images from "src/utils/imageImporter";
import BackgroundImageWithTextOnTop from "./BackgroundImageWithTextOnTop";
import { capitalizeFirstLetter } from "src/utils/stringHandler";

const speciesColors = {
	dog: "#FF6F61",
	cat: "#9B59B6",
	rabbit: "#FFB6C1",
	ferret: "#F39C12",
	guineaPig: "#E67E22",
	snake: "#2ECC71",
	lizard: "#1ABC9C",
	fish: "#3498DB",
	hamster: "#E74C3C",
	horse: "#34495E",
	amphibian: "#27AE60",
	insect: "#F1C40F",
	mouse: "#BDC3C7",
	bird: "#1F77B4",
};

interface PetCardProps {
	pet: PetWithIncludes;
}

export default function PetCard({ pet }: PetCardProps) {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	let imageSource: ImageSourcePropType = {};
	if (pet.species)
		imageSource =
			images[pet.species.toLocaleLowerCase() as keyof typeof images];

	let speciesColor = "#FF65B4";
	if (pet.species)
		speciesColor =
			speciesColors[
				pet.species.toLowerCase() as keyof typeof speciesColors
			];

	const texts = [`Name: ${pet.name}`];
	if (pet.species)
		texts.push(
			`${capitalizeFirstLetter(pet.species?.toLocaleLowerCase().replace("-", " "))}`
		);

	return (
		<TouchableOpacity
			style={{
				justifyContent: "center",
				alignItems: "center",
			}}
			onPress={() =>
				navigation.navigate("PetDetails", {
					pet,
					imageSource,
					color: speciesColor,
				})
			}
		>
			<BackgroundImageWithTextOnTop
				imageSource={imageSource}
				texts={texts}
				shouldHaveOverlay={true}
				backgroundImageStyle={[
					styles.backgroundImage,
					{ borderColor: speciesColor },
				]}
				textStyle={[styles.petInfoText, { color: speciesColor }]}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	backgroundImage: {
		borderRadius: 30,
		overflow: "hidden",
		borderWidth: 2,
	},
	petInfoText: {
		marginBottom: 5,
		marginHorizontal: 0,
	},
});
