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
					<Stack.Screen name="MainPage" component={MainPage} />
					<Stack.Screen name="MyPets" component={MyPetsScreen} />
					<Stack.Screen name="AddPet" component={AddPetScreen} />
				</>
			)}
		</Stack.Navigator>
	);
};

const Navigation = () => {
	return (
		<AuthProvider>
			<NavigationContainer>
				<NavigationContent />
			</NavigationContainer>
		</AuthProvider>
	);
};

export default Navigation;
