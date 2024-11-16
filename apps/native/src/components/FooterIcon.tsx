import React from "react";
import {
	ColorValue,
	GestureResponderEvent,
	ImageSourcePropType,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { Image, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

interface FooterIconProps {
	onPress: ((event: GestureResponderEvent) => void) | undefined;
	color: ColorValue;
	image: ImageSourcePropType | string;
	pageText: string;
}

const FooterIcon: React.FC<FooterIconProps> = function ({
	onPress,
	color,
	image,
	pageText,
}) {
	return (
		<TouchableOpacity onPress={onPress} style={styles.iconButton}>
			{typeof image === "string" ? (
				<Icon name={image} size={24} color={color} />
			) : (
				<Image
					source={image}
					style={[styles.iconImage, { tintColor: color }]}
					resizeMode="contain"
				/>
			)}
			<Text style={[styles.iconText, { color }]}>{pageText}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	iconButton: {
		alignItems: "center",
		justifyContent: "center",
	},
	iconImage: {
		width: 24,
		height: 24,
	},
	iconText: {
		fontSize: 12,
	},
});

export default FooterIcon;
