import { useRoute } from "@react-navigation/native";
import PaginatedStoreList from "src/components/PaginatedStoreList";
import { StoreType } from "@api-types/PrismaEnums";
import { ScrollView } from "react-native";
import Header from "src/components/Header";

export default function StoreListScreen() {
	const { storeType } = useRoute().params as { storeType: StoreType };

	return (
		<>
			<Header
				title={storeType === "PET_STORE" ? "Pet Stores" : "Vet Stores"}
			/>
			<PaginatedStoreList storeType={storeType} />
		</>
	);
}
