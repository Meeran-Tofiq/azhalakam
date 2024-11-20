import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome6";
import { RootStackParamList } from "../types/types";

type BackButtonProps = {
	buttonStyle?: ViewStyle;
	iconStyle?: any;
};

const BackButton: React.FC<BackButtonProps> = ({ buttonStyle, iconStyle }) => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<TouchableOpacity
			onPress={() => navigation.goBack()}
			style={[styles.backButton, buttonStyle]}
		>
			<Icon
				name="arrow-left-long"
				style={[styles.cIconStyle, iconStyle]}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	backButton: {
		padding: 5,
		marginRight: 10,
	},
	cIconStyle: {
		color: "#4552CB",
		fontSize: 20,
	},
});

export default BackButton;
