import { PetWithIncludes } from "../../../api/dist/src/types/Pet";
import { ImageURISource } from "react-native";
import { StoreWithIncludes } from "../../../api/dist/src/types/Store";
import { StoreType } from "../../../api/dist/src/types/PrismaEnums";

export type RootStackParamList = {
	Welcome: undefined;
	Registration: undefined;
	Login: undefined;
	MainPage: undefined;
	Profile: undefined;
	MyPets: undefined;
	PetDetails: {
		pet: PetWithIncludes;
		imageSource: ImageURISource;
		color: string;
	};
	AddPet: undefined;
	UpdatePet: {
		pet: PetWithIncludes;
	};
	MyStore: undefined;
	StoreCreation: undefined;
	StoreDetails: {
		store: StoreWithIncludes;
	};
	StoreEdit: {
		store: StoreWithIncludes;
	};
	StoreListScreen: {
		storeType: StoreType;
	};
	ProductListScreen: undefined;
};
