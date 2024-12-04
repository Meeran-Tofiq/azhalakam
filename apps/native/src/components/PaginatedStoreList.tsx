import { useEffect, useState } from "react";
import PaginatedList from "./PaginatedList";
import { GetAllStoresOfPageResponse } from "@api-types/Store";
import { StoreType } from "@api-types/PrismaEnums";
import useApiClient from "src/hooks/useApiClient";
import StoreCard from "./StoreCard";
import { Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";

type PaginatedStoreListProps = {
	storeType?: StoreType;
};

export default function PaginatedStoreList({
	storeType,
}: PaginatedStoreListProps) {
	const apiClient = useApiClient();

	const [currentPage, setCurrentPage] = useState(1);
	const [data, setData] = useState<GetAllStoresOfPageResponse["stores"]>();
	const [hasMore, setHasMore] =
		useState<GetAllStoresOfPageResponse["hasMore"]>(false);

	function onPageChange(newPage: number) {
		setCurrentPage(newPage);
	}

	useEffect(() => {
		const loadData = async () => {
			try {
				const { stores, hasMore } =
					await apiClient.storeApi.getAllStoresOfPage({
						page: currentPage,
						storeType,
					});

				setData(stores);
				setHasMore(hasMore);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		loadData();
	}, [currentPage]);

	return (
		<PaginatedList
			currentPage={currentPage}
			hasMore={hasMore}
			onPageChange={onPageChange}
		>
			{data && data.length > 0 ? (
				data.map((store) => <StoreCard key={store.id} store={store} />)
			) : (
				<Text style={styles.noStoresText}>No stores found</Text>
			)}
		</PaginatedList>
	);
}

const styles = StyleSheet.create({
	noStoresText: {
		textAlign: "center",
	},
});
