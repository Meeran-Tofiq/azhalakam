import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginUserResponse, UserWithoutPassword } from "@api-types/User";
import useApiClient from "src/hooks/useApiClient";
type AuthContextType = {
	isAuthenticated: boolean;
	user: UserWithoutPassword | null;
	token: string | null;
	login: (userData: any) => Promise<void>;
	logout: () => Promise<void>;
	loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<UserWithoutPassword | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const apiClient = useApiClient();

	useEffect(() => {
		checkAuthState();
	}, []);

	useEffect(() => {
		if (token) apiClient.setUserToken(token);
	}, [token]);

	const checkAuthState = async () => {
		try {
			const userData = await AsyncStorage.getItem("userData");
			if (userData) {
				const parsedUserData: LoginUserResponse = JSON.parse(userData);
				setUser(parsedUserData.user);
				setToken(parsedUserData.token);
				setIsAuthenticated(true);
			}
		} catch (error) {
			console.error("Error checking auth state:", error);
		} finally {
			setLoading(false);
		}
	};

	const login = async (userData: any) => {
		try {
			const userToStore: UserWithoutPassword = {
				username: userData.username || userData.user?.username,
				firstName: userData.firstName || userData.user?.firstName,
				lastName: userData.lastName || userData.user?.lastName,
				email: userData.email || userData.user?.email,
				phoneNo: userData.phoneNo || userData.user?.phoneNo,
				bio: userData.bio || userData.user?.bio,
				id: userData.id || userData.user?.id,
				location: userData.location || userData.user?.location,
				locationId: userData.locationId || userData.user?.locationId,
				pets: userData.pets || userData.user?.pets,
				serviceProvider:
					userData.serviceProvider || userData.user?.serviceProvider,
				serviceProviderId:
					userData.serviceProviderId ||
					userData.user?.serviceProviderId,
				store: userData.store || userData.user?.store,
			};

			await AsyncStorage.setItem("userData", JSON.stringify(userToStore));
			setUser(userToStore);
			setIsAuthenticated(true);
		} catch (error) {
			console.error("Error storing auth data:", error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			await AsyncStorage.removeItem("userData");
			setUser(null);
			setIsAuthenticated(false);
		} catch (error) {
			console.error("Error removing auth data:", error);
			throw error;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				login,
				logout,
				token,
				loading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
