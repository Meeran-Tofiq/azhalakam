export type RootStackParamList = {
	Welcome: undefined;
	Registration: undefined;
	Login: undefined;
	MainPage: undefined;
	MyStore: undefined;
	StoreCreation: undefined;
	StoreDetails: {
		storeId: string;
	};
	StoreEdit: {
		storeId: string;
	};
};
