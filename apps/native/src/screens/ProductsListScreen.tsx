import { ProductCategory } from "@api-types/PrismaEnums";
import Header from "src/components/Header";
import PaginatedProductList from "src/components/PaginatedProductList";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

const options: { label: string; value: ProductCategory }[] = [
	{ label: "Food", value: "FOOD" },
	{ label: "Toys", value: "TOY" },
	{ label: "Miscellaneous", value: "MISCELLANEOUS" },
];

export default function ProductListScreen() {
	const [productCategory, setProductCategory] =
		useState<ProductCategory>("MISCELLANEOUS");

	let title: string;
	switch (productCategory) {
		case "FOOD":
			title = "Pet Food";
			break;
		case "TOY":
			title = "Pet Toys";
			break;
		default:
			title = "Miscellaneous";
			break;
	}

	return (
		<>
			<Header title={title + " Products"} />
			<Picker
				selectedValue={productCategory}
				onValueChange={(itemValue) => setProductCategory(itemValue)}
				style={styles.picker}
			>
				{/* Add a default placeholder option */}
				<Picker.Item label="Select an option..." value={null} />
				{options.map((option, index) => (
					<Picker.Item
						key={index}
						label={option.label}
						value={option.value}
					/>
				))}
			</Picker>
			<PaginatedProductList category={productCategory} />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 15,
	},
	label: {
		color: "#4552CB",
		fontWeight: "bold",
	},
	pickerContainer: {
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 5,
		overflow: "hidden", // Ensures the picker fits nicely in the styled container
	},
	picker: {
		color: "#000",
	},
	error: {
		color: "red",
		fontSize: 12,
		marginTop: 5,
	},
});
