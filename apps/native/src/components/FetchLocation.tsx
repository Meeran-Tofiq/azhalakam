import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useApiClient from "../hooks/useApiClient";
import { useAuth } from "../context/AuthContext";

const FetchLocation: React.FC = () => {
	const [location, setLocation] = useState(null);
	const apiClient = useApiClient();
	const { user } = useAuth();

	useEffect(() => {
		const fetchLocation = async () => {
			if (!user?.locationId) {
				Alert.alert("Error", "No location ID found for the user.");
				return;
			}
			try {
				const locationData =
					await apiClient.locationApi.getLocationFromId({
						id: user.locationId,
					});
				setLocation(locationData.location);
			} catch (error: any) {
				Alert.alert(
					"Error",
					error.message || "Failed to fetch location."
				);
			}
		};

		fetchLocation();
	}, [user?.locationId]);

	return (
		<View style={styles.container}>
			{location ? (
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: location.latitude,
						longitude: location.longitude,
						latitudeDelta: 0.005,
						longitudeDelta: 0.005,
					}}
				>
					<Marker coordinate={location} />
				</MapView>
			) : (
				<Text>Loading location...</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	map: {
		flex: 1,
		marginTop: 20,
	},
});

export default FetchLocation;
