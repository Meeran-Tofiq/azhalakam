import React, { useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	Button,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Header from "src/components/Header";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/types/types";
import GenericButton from "src/components/GenericButton";

const CartScreen = () => {
	const {
		cartItems,
		totalPrice,
		clearCart,
		increaseQuantity,
		decreaseQuantity,
	} = useContext(CartContext);
	const { user } = useAuth();
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<View style={styles.container}>
			<Header title="Cart"></Header>
			<ScrollView contentContainerStyle={styles.body}>
				{cartItems.length > 0 ? (
					cartItems.map((item, index) => (
						<View key={index} style={styles.itemContainer}>
							<Image
								source={item.image}
								style={styles.productImage}
							/>
							<View style={styles.itemDetails}>
								<Text style={styles.itemText}>
									{item.name}: ${item.price} x {item.quantity}
								</Text>
								<Text style={styles.totalPriceText}>
									Amount: $
									{(item.price * item.quantity).toFixed(2)}
								</Text>
								<View style={styles.quantityControls}>
									<TouchableOpacity
										onPress={() =>
											increaseQuantity(item.name)
										}
										style={styles.quantityButton}
									>
										<Text style={styles.quantityButtonText}>
											+
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() =>
											decreaseQuantity(item.name)
										}
										style={styles.quantityButton}
									>
										<Text style={styles.quantityButtonText}>
											-
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					))
				) : (
					<View style={styles.emptyCartContainer}>
						<Text style={styles.emptyCartText}>
							There's nothing in your cart yet.
						</Text>
						<GenericButton
							label="Add Items"
							style={[
								styles.addItemsButton,
								styles.footerButtons,
							]}
							onPress={() => {
								navigation.navigate("ProductListScreen");
							}}
							labelStyle={styles.addItemsButtonLabel}
						/>
					</View>
				)}
				{cartItems.length > 0 && (
					<Text style={styles.totalText}>Total: ${totalPrice}</Text>
				)}
			</ScrollView>
			{cartItems.length > 0 && (
				<View style={styles.buttonContainer}>
					<GenericButton
						label="Add Items"
						style={[styles.addItemsButton, styles.footerButtons]}
						onPress={() => {
							navigation.navigate("ProductListScreen");
						}}
						labelStyle={styles.addItemsButtonLabel}
					></GenericButton>
					<GenericButton
						label="Deliver Order"
						style={styles.footerButtons}
						onPress={() => {
							alert(
								`Order is being delivered, ${user?.firstName}`
							);
							clearCart();
							navigation.navigate("MainPage");
						}}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F0F4F8",
	},
	body: {
		padding: 20,
	},
	itemContainer: {
		marginBottom: 10,
		paddingBottom: 10,
		borderBottomWidth: 2,
		borderColor: "lightgrey",
		flexDirection: "row",
		alignItems: "center",
	},
	productImage: {
		width: 100,
		height: 100,
		borderRadius: 16,
		borderWidth: 2,
		borderColor: "#4552CB",
		marginRight: 10,
	},
	itemDetails: {
		flex: 1,
	},
	itemText: {
		fontSize: 18,
	},
	totalText: {
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 20,
	},
	totalPriceText: {
		fontSize: 16,
		color: "gray",
	},
	quantityControls: {
		flexDirection: "row",
	},
	quantityButton: {
		marginHorizontal: 5,
		paddingHorizontal: 12,
		backgroundColor: "#ddd",
		borderRadius: 5,
	},
	quantityButtonText: {
		fontSize: 24,
	},
	buttonContainer: {
		flexDirection: "row",
		padding: 20,
		backgroundColor: "#fff",
		justifyContent: "space-around",
	},
	footerButtons: {
		borderRadius: 8,
		paddingHorizontal: 40,
		paddingVertical: 12,
	},
	addItemsButton: {
		backgroundColor: "transparent",
		borderWidth: 2,
		borderColor: "#4652cc",
	},
	addItemsButtonLabel: {
		color: "#4652cc",
	},
	emptyCartContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	emptyCartText: {
		fontSize: 18,
		color: "#4B5563",
		marginBottom: 20,
		textAlign: "center",
	},
});

export default CartScreen;
