import React, { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { ProductWithIncludes } from "../../../api/dist/src/types/Product";
import images from "src/utils/imageImporter";
import { Image } from "react-native-elements";
import LanguageRowView from "./LanguageView";
import { CartContext } from "../context/CartContext";

interface ProductCardProps {
	product: ProductWithIncludes;
}

export default function ProductCard({ product }: ProductCardProps) {
	const { addToCart } = useContext(CartContext);

	let image;
	switch (product.category) {
		case "FOOD":
			image = images.petFood;
			break;
		case "TOY":
			image = images.petToy;
			break;
		default:
			image = images.miscellaneous;
			break;
	}

	return (
		<LanguageRowView style={styles.productContainer}>
			<Image source={image} style={styles.productImage} />
			<View style={styles.infoContainer}>
				<Text style={styles.productName}>{product.name}</Text>
				<Text style={styles.productInfoText}>${product.price}</Text>
				<Button
					title="Add to Cart"
					onPress={() => addToCart({ ...product, image })}
				/>
			</View>
		</LanguageRowView>
	);
}

const styles = StyleSheet.create({
	productContainer: {
		backgroundColor: "white",
		borderRadius: 10,
		margin: 5,
		padding: 10,
	},
	infoContainer: {
		flex: 1,
		padding: 10,
	},
	productImage: {
		width: 100,
		height: 100,
		borderRadius: 16,
		borderWidth: 2,
		borderColor: "#4552CB",
	},
	productName: {
		fontSize: 18,
		fontWeight: "bold",
	},
	productInfoText: {
		fontSize: 16,
	},
});
