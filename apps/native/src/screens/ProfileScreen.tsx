import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../context/AuthContext";
import Header from "src/components/Header";

const ProfileScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { user, logout } = useAuth();

	const menuItems = [
		{ label: "My pets", icon: "paw" },
		{ label: "My favourites", icon: "heart" },
		{ label: "Add pet service", icon: "plus-circle" },
		{ label: "Invite friends", icon: "share-alt" },
		{ label: "Help", icon: "question-circle" },
		{ label: "Settings", icon: "cog" },
	];

	const handleLogout = async () => {
		try {
			await logout();
			navigation.replace("Login");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<View style={styles.container}>
			<Header
				title={
					<View style={styles.titleContainer}>
						<View style={styles.initialCircle}>
							<Text style={styles.initialText}>
								{user?.firstName?.charAt(0) || "F"}
							</Text>
						</View>
						<Text style={styles.titleText}>
							{`${user?.firstName || "First"} ${user?.lastName || "Last"}`}
						</Text>
					</View>
				}
				headerStyle={styles.header}
				backButtonStyle={styles.hiddenBackButton}
				showThreeDots={true}
				menuItems={[
					{
						label: "Log Out",
						onPress: () => handleLogout(),
						icon: "sign-out",
					},
				]}
				threeDotsStyles={{
					iconStyle: {
						color: "#4652CC",
					},
				}}
			/>

			<View style={styles.menu}>
				{menuItems.map((item, index) => (
					<TouchableOpacity key={index} style={styles.menuItem}>
						<Icon name={item.icon} size={24} color="#6C63FF" />
						<Text style={styles.menuText}>{item.label}</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8F8F8",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 12,
		borderBottomWidth: 12,
		borderColor: "#E8E8E8",
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	initialCircle: {
		width: 45,
		height: 45,
		borderRadius: 25,
		backgroundColor: "#E0E0FF",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10,
	},
	initialText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	titleText: {
		fontSize: 24,
		fontWeight: "bold",
	},
	hiddenBackButton: {
		display: "none",
	},
	menu: {
		// marginTop: 20,
	},
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#EEE",
	},
	menuText: {
		marginLeft: 10,
		fontSize: 14,
		fontWeight: "500",
		color: "#333",
	},
});

export default ProfileScreen;
