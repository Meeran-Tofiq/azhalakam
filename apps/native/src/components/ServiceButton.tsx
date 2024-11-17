import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

type ServiceButtonProps = {
	image: any;
	label: string;
	onPress: () => void;
};

const ServiceButton: React.FC<ServiceButtonProps> = ({ image, label, onPress }) => (
	<TouchableOpacity style={styles.serviceButton} onPress={onPress}>
		<View style={styles.iconCircle}>
			<Image
				source={image}
				style={styles.serviceImage}
				resizeMode="contain"
			/>
		</View>
		<Text style={styles.serviceLabel}>{label}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	serviceButton: {
		width: 100, 
		alignItems: "center",
		marginBottom: 20,
	},
	iconCircle: {
		width: 88,
		height: 88,
		borderRadius: 30,
		backgroundColor: "#FFFFFF",
		justifyContent: "center",
		alignItems: "center",
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		marginBottom: 10,
	},
	serviceImage: {
		width: 30,
		height: 30,
	},
	serviceLabel: {
		textAlign: "center",
		fontSize: 14,
		color: "#1F2937",
	},
});

export default ServiceButton;
