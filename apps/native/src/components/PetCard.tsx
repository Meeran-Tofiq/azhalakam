import { PetWithIncludes } from "@api-types/Pet";
import { LinearGradient } from "expo-linear-gradient";
import {
	ImageBackground,
	ImageSourcePropType,
	StyleSheet,
	View,
} from "react-native";
import { Text } from "react-native-elements";
import images from "src/utils/imageImporter";

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

function capitalizeFirstLetter(val: string) {
	return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

interface PetCardProps {
	pet: Partial<PetWithIncludes>;
}

export default function PetCard({ pet }: PetCardProps) {
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

	return (
		<ImageBackground
			source={imageSource}
			style={[styles.backgroundImage, { borderColor: speciesColor }]}
		>
			<LinearGradient
				colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0)"]}
				style={styles.gradient}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
			/>
			<View style={styles.overlay}>
				<Text style={[styles.petInfoText, { color: speciesColor }]}>
					{"NAME: " + pet.name}
				</Text>
				{pet.species && (
					<Text style={[styles.petInfoText, { color: speciesColor }]}>
						{"SPECIES: " +
							capitalizeFirstLetter(
								pet.species
									?.toLocaleLowerCase()
									.replace("-", " ")
							)}
					</Text>
				)}
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	backgroundImage: {
		width: "100%",
		height: 150,
		borderRadius: 30,
		overflow: "hidden",
		borderWidth: 2,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		padding: 15,
		justifyContent: "flex-end",
	},
	gradient: {
		...StyleSheet.absoluteFillObject,
	},
	petInfoText: {
		backgroundColor: "rgba(255, 255, 255, 0.85)",
		padding: 5,
		borderRadius: 15,
		marginBottom: 5,
		textAlign: "center",
		maxWidth: "40%",
	},
});
