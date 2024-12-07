import { useState } from "react";
import PaginatedList from "./PaginatedList";
import ProductCard from "./ProductCard";
import { Text } from "react-native-elements";
import { StyleSheet } from "react-native";
import { ProductCategory } from "@api-types/PrismaEnums";
import Popup from "./PopUp";

type PaginatedProductListProps = {
	category?: ProductCategory;
};

const hardcodedProducts = [
	{ id: "1", name: "Pet Collar", price: 15, category: "MISCELLANEOUS" },
	{ id: "2", name: "Cat Food", price: 5, category: "FOOD" },
	{ id: "3", name: "Cat Toy", price: 10, category: "TOY" },
];

export default function PaginatedProductList({
	category,
}: PaginatedProductListProps) {
	const [data, setData] = useState(hardcodedProducts);
	const [totalPrice, setTotalPrice] = useState(0);
	const [popupVisible, setPopupVisible] = useState(false);

	const handleAddToCart = (price: number) => {
		setTotalPrice(totalPrice + price);
		setPopupVisible(true);
	};

	return (
		<>
			<PaginatedList>
				{data && data.length > 0 ? (
					data.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onAddToCart={() => handleAddToCart(product.price)}
						/>
					))
				) : (
					<Text style={styles.noProductsText}>No products found</Text>
				)}
			</PaginatedList>
		</>
	);
}

const styles = StyleSheet.create({
	noProductsText: {
		textAlign: "center",
	},
});
