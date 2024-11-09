import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
	isAuthenticated: boolean;
	login: (userData: any) => Promise<void>;
	logout: () => Promise<void>;
	loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check for stored authentication state when app loads
		checkAuthState();
	}, []);

	const checkAuthState = async () => {
		try {
			const userData = await AsyncStorage.getItem("userData");
			if (userData) {
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
			// Store user data in AsyncStorage
			await AsyncStorage.setItem("userData", JSON.stringify(userData));
			setIsAuthenticated(true);
		} catch (error) {
			console.error("Error storing auth data:", error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			// Remove user data from AsyncStorage
			await AsyncStorage.removeItem("userData");
			setIsAuthenticated(false);
		} catch (error) {
			console.error("Error removing auth data:", error);
			throw error;
		}
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, login, logout, loading }}
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
