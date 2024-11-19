import { PetWithIncludes } from "../../../api/dist/src/types/Pet";

export type RootStackParamList = {
	Welcome: undefined;
	Registration: undefined;
	Login: undefined;
	MainPage: undefined;
	MyPets: undefined;
	PetDetails: { pet: PetWithIncludes };
	AddPet: undefined;
};
