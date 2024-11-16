import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNo: string;
};

type AuthContextType = {
	isAuthenticated: boolean;
	user: User | null;
	login: (userData: any) => Promise<void>;
	logout: () => Promise<void>;
	loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		checkAuthState();
	}, []);

	const checkAuthState = async () => {
		try {
			const userData = await AsyncStorage.getItem("userData");
			if (userData) {
				const parsedUserData = JSON.parse(userData);
				setUser(parsedUserData);
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
			const userToStore = {
				username: userData.username || userData.user?.username,
				firstName: userData.firstName || userData.user?.firstName,
				lastName: userData.lastName || userData.user?.lastName,
				email: userData.email || userData.user?.email,
				phoneNo: userData.phoneNo || userData.user?.phoneNo,
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
