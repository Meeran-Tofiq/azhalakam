import { createNavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList } from "src/types/types";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = (name: keyof RootStackParamList, params?: object) => {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params);
	}
};
