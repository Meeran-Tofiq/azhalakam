import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

const Footer = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const route = useRoute();

	const getColor = (page: string) => {
		return route.name === page ? "#4552CB" : "#BBC3CE";
	};

	return (
		<View style={styles.footer}>
			<TouchableOpacity
				onPress={() => navigation.navigate("MainPage")}
				style={styles.iconButton}
			>
				<Image
					source={require("../../assets/home-icon.png")}
					style={[
						styles.iconButton,
						{ tintColor: getColor("MainPage") },
					]}
					resizeMode="contain"
				/>
				<Text
					style={[styles.iconText, { color: getColor("MainPage") }]}
				>
					Home
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => navigation.navigate("Appointments")}
				style={styles.iconButton}
			>
				<Icon
					name="calendar-outline"
					size={24}
					color={getColor("Appointments")}
				/>
				<Text
					style={[
						styles.iconText,
						{ color: getColor("Appointments") },
					]}
				>
					Appointments
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => navigation.navigate("Profile")}
				style={styles.iconButton}
			>
				<Icon
					name="person-outline"
					size={24}
					color={getColor("Profile")}
				/>
				<Text style={[styles.iconText, { color: getColor("Profile") }]}>
					Profile
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	footer: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingVertical: 10,
		backgroundColor: "#FFFFFF",
		borderTopWidth: 1,
		borderTopColor: "#E0E0E0",
	},
	iconButton: {
		alignItems: "center",
	},
	iconText: {
		fontSize: 12,
		color: "#BBC3CE",
		marginTop: 4,
	},
});

export default Footer;
