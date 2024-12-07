import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";
import MainPage from "../screens/MainPage";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../types/types";
import MyPetsScreen from "src/screens/MyPetsScreen";
import AddPetScreen from "src/screens/AddPetScreen";
import PetDetailsScreen from "src/screens/PetDetailsScreen";
import UpdatePetScreen from "src/screens/UpdatePetScreen";
import { navigationRef } from "./NavigationService"; // Import the reference
import MyStoreScreen from "../screens/MyStoreScreen";
import StoreCreationScreen from "../screens/StoreCreationScreen";
import StoreDetailsScreen from "src/screens/StoreDetailsScreen";
import StoreEditScreen from "../screens/StoreEditScreen";
import ProfileScreen from "../screens/ProfileScreen";
import StoreListScreen from "src/screens/StoreListScreen";
import ProductListScreen from "src/screens/ProductsListScreen";
import CartScreen from "../screens/CartScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationContent = () => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{!isAuthenticated ? (
				// Auth screens
				<>
					<Stack.Screen name="Welcome" component={WelcomeScreen} />
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen
						name="Registration"
						component={RegistrationScreen}
					/>
				</>
			) : (
				// App screens
				<>
					<>
						<Stack.Screen name="MainPage" component={MainPage} />
						<Stack.Screen
							name="Profile"
							component={ProfileScreen}
						/>
						<Stack.Screen name="MyPets" component={MyPetsScreen} />
						<Stack.Screen name="AddPet" component={AddPetScreen} />
						<Stack.Screen
							name="PetDetails"
							component={PetDetailsScreen}
						/>
						<Stack.Screen
							name="UpdatePet"
							component={UpdatePetScreen}
						/>
					</>
					<Stack.Screen name="MyStore" component={MyStoreScreen} />
					<Stack.Screen
						name="StoreCreation"
						component={StoreCreationScreen}
					/>
					<Stack.Screen
						name="StoreDetails"
						component={StoreDetailsScreen}
					/>
					<Stack.Screen
						name="StoreEdit"
						component={StoreEditScreen}
					/>
					<Stack.Screen
						name="StoreListScreen"
						component={StoreListScreen}
					/>
					<Stack.Screen
						name="ProductListScreen"
						component={ProductListScreen}
					/>
					<Stack.Screen name="CartScreen" component={CartScreen} />
				</>
			)}
		</Stack.Navigator>
	);
};

const Navigation = () => {
	return (
		<AuthProvider>
			<NavigationContainer ref={navigationRef}>
				<NavigationContent />
			</NavigationContainer>
		</AuthProvider>
	);
};

export default Navigation;
