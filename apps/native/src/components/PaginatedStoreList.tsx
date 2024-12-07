import { useEffect, useState } from "react";
import PaginatedList from "./PaginatedList";
import { GetAllStoresOfPageResponse } from "@api-types/Store";
import { StoreType } from "@api-types/PrismaEnums";
import useApiClient from "src/hooks/useApiClient";
import StoreCard from "./StoreCard";
import { Text } from "react-native-elements";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "src/types/types";

type PaginatedStoreListProps = {
	storeType?: StoreType;
};

export default function PaginatedStoreList({
	storeType,
}: PaginatedStoreListProps) {
	const apiClient = useApiClient();
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
				data.map((store) => {
					if (storeType === "VET_STORE") {
						return (
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("VetStoreScreen", {
										store,
									})
								}
								key={store.id}
							>
								<StoreCard store={store} />
							</TouchableOpacity>
						);
					} else if (storeType === "PET_STORE") {
						return <StoreCard key={store.id} store={store} />;
					}
				})
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
