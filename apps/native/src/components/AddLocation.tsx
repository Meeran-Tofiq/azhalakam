import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, StyleSheet, Alert, Image } from "react-native";
import MapView from "react-native-maps";
import useApiClient from "../hooks/useApiClient";
import { useAuth } from "../context/AuthContext";
import * as Location from "expo-location";

const AddLocation = () => {
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [hasLocationPermission, setHasLocationPermission] = useState(false);
	const mapRef = useRef(null);
	const apiClient = useApiClient();
	const { user, setUser } = useAuth();

	useEffect(() => {
		const requestLocationPermission = async () => {
			const { status } =
				await Location.requestForegroundPermissionsAsync();
			if (status === "granted") {
				setHasLocationPermission(true);
				const location = await Location.getCurrentPositionAsync({});
				const newRegion = {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.005,
					longitudeDelta: 0.005,
				};
				setSelectedLocation({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
				});
				if (mapRef.current) {
					mapRef.current.animateToRegion(newRegion, 1000);
				}
			} else {
				Alert.alert(
					"Permission Denied",
					"Location permission is required to add a location."
				);
			}
		};

		requestLocationPermission();
	}, []);

	const handleRegionChangeComplete = (region) => {
		setSelectedLocation({
			latitude: region.latitude,
			longitude: region.longitude,
		});
	};

	const handleAddLocation = async () => {
		if (!selectedLocation) {
			Alert.alert("Error", "Location not available.");
			return;
		}

		try {
			const locationData = {
				location: {
					latitude: selectedLocation.latitude,
					longitude: selectedLocation.longitude,
				},
			};

			const response =
				await apiClient.locationApi.createLocation(locationData);
			const newLocationId = response.location.id;

			setUser({
				...user,
				locationId: newLocationId,
			});

			Alert.alert("Success", "Location added successfully!");
		} catch (error) {
			Alert.alert("Error", error.message || "Failed to add location.");
		}
	};

	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				style={styles.map}
				initialRegion={{
					latitude: selectedLocation
						? selectedLocation.latitude
						: 37.78825,
					longitude: selectedLocation
						? selectedLocation.longitude
						: -122.4324,
					latitudeDelta: 0.005,
					longitudeDelta: 0.005,
				}}
				onRegionChangeComplete={handleRegionChangeComplete}
			/>
			<View style={styles.markerFixed}>
				<Image
					style={styles.marker}
					source={require("../../assets/map_marker.png")}
				/>
			</View>
			<Button title="Add Location" onPress={handleAddLocation} />
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
	markerFixed: {
		position: "absolute",
		top: "50%",
		left: "50%",
		
	},
	marker: {
		height: 60,
		width: 60,
		resizeMode: "contain",
	},
});

export default AddLocation;
