import { PetWithIncludes } from "../../../api/dist/src/types/Pet";
import { ImageURISource } from "react-native";

export type RootStackParamList = {
	Welcome: undefined;
	Registration: undefined;
	Login: undefined;
	MainPage: undefined;
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
};
