import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginUserResponse, UserWithoutPassword } from "@api-types/User";
import useApiClient from "src/hooks/useApiClient";

type AuthContextType = {
	isAuthenticated: boolean;
	user: UserWithoutPassword | null;
	setUser: (user: UserWithoutPassword) => void;
	token: string | null;
	login: (userData: LoginUserResponse) => Promise<void>;
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

	const login = async (userData: LoginUserResponse) => {
		try {
			await AsyncStorage.setItem("userData", JSON.stringify(userData));
			setUser(userData.user);
			setToken(userData.token);
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
			setToken(null);
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
				setUser,
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
