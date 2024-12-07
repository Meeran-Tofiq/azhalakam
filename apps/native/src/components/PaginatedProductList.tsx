import { useEffect, useState } from "react";
import PaginatedList from "./PaginatedList";
import { ProductCategory, StoreType } from "@api-types/PrismaEnums";
import useApiClient from "src/hooks/useApiClient";
import ProductCard from "./ProductCard";
import { Text } from "react-native-elements";
import { StyleSheet } from "react-native";
import { GetAllProductsResponse } from "../../../api/dist/src/types/Product";
import { ProductWithIncludes } from "../../../api/dist/src/types/Product";
// import { useLoading } from "src/context/LoadingContext";

type PaginatedProductListProps = {
	storeId?: ProductWithIncludes["id"];
	category?: ProductCategory;
};

export default function PaginatedProductList({
	storeId,
	category,
}: PaginatedProductListProps) {
	const apiClient = useApiClient();
	// const { setIsLoading } = useLoading();

	const [currentPage, setCurrentPage] = useState(1);
	const [data, setData] = useState<GetAllProductsResponse["products"]>();
	const [hasMore, setHasMore] =
		useState<GetAllProductsResponse["hasMore"]>(false);

	function onPageChange(newPage: number) {
		setCurrentPage(newPage);
	}

	useEffect(() => {
		const loadData = async () => {
			// setIsLoading(true);
			try {
				const { products, hasMore } =
					await apiClient.productsApi.getAllProductsAtPage({
						page: currentPage,
						category,
					});

				setData(products);
				setHasMore(hasMore);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				// setIsLoading(false);
			}
		};
		loadData();
	}, [currentPage, category]);

	return (
		<PaginatedList
			currentPage={currentPage}
			hasMore={hasMore}
			onPageChange={onPageChange}
		>
			{data && data.length > 0 ? (
				data.map((product) => (
					<ProductCard key={product.id} product={product} />
				))
			) : (
				<>
					<Text style={styles.noProductsText}>No products found</Text>
					<Text style={styles.noProductsText}>{currentPage}</Text>
				</>
			)}
		</PaginatedList>
	);
}

const styles = StyleSheet.create({
	noProductsText: {
		textAlign: "center",
	},
});