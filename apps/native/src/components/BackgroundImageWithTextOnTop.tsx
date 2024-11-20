import { LinearGradient } from "expo-linear-gradient";
import {
	ImageBackground,
	ImageSourcePropType,
	ImageStyle,
	StyleProp,
	StyleSheet,
	TextStyle,
	View,
} from "react-native";
import { Text } from "react-native-elements";
import { PetWithIncludes } from "../../../api/dist/src/types/Pet";

interface BackgroundImageWithTextOnTopProps {
	texts: string | string[];
	imageSource: ImageSourcePropType;
	shouldHaveOverlay: boolean;
	backgroundImageStyle?: StyleProp<ImageStyle>;
	textStyle?: StyleProp<TextStyle>;
}

function Texts({
	texts,
	textStyle,
}: {
	texts: string | string[];
	textStyle: StyleProp<TextStyle>;
}) {
	if (typeof texts === "string") {
		return <Text style={[styles.imageText, textStyle]}>{texts}</Text>;
	}
	return texts.map((text, index) => (
		<Text key={index} style={[styles.imageText, textStyle]}>
			{text}
		</Text>
	));
}

export default function BackgroundImageWithTextOnTop({
	texts,
	imageSource,
	shouldHaveOverlay,
	backgroundImageStyle,
	textStyle,
}: BackgroundImageWithTextOnTopProps) {
	return (
		<ImageBackground
			source={imageSource}
			style={[styles.backgroundImage, backgroundImageStyle]}
		>
			<LinearGradient
				colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0)"]}
				style={styles.gradient}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
			/>
			{shouldHaveOverlay ? (
				<View style={styles.overlay}>
					<Texts texts={texts} textStyle={textStyle} />
				</View>
			) : (
				<Texts texts={texts} textStyle={textStyle} />
			)}
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	backgroundImage: {
		width: "100%",
		height: 150,
		overflow: "hidden",
		justifyContent: "flex-end",
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		padding: 15,
		justifyContent: "flex-end",
	},
	gradient: {
		...StyleSheet.absoluteFillObject,
	},
	imageText: {
		backgroundColor: "rgba(255, 255, 255, 0.85)",
		padding: 5,
		borderRadius: 15,
		textAlign: "center",
		maxWidth: "40%",
		marginBottom: 8,
		marginHorizontal: 15,
	},
});
