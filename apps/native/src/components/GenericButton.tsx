import React from "react";
import {
	TouchableOpacity,
	StyleSheet,
	ViewStyle,
	GestureResponderEvent,
	Text,
} from "react-native";

type GenericButtonProps = {
	onPress: (event: GestureResponderEvent) => void;
	style?: ViewStyle;
	label: string;
	labelStyle?: ViewStyle,
	children?: React.ReactNode;
};

const GenericButton: React.FC<GenericButtonProps> = ({
	onPress,
	style,
	label,
	labelStyle,
	children,
}) => {
	return (
		<TouchableOpacity onPress={onPress} style={[styles.button, style]}>
			{children}
			<Text style={[styles.label, labelStyle]}>{label}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		padding: 10,
		backgroundColor: "#4652cc",
	},
	label: {
		color: "white",
	},
});

export default GenericButton;
