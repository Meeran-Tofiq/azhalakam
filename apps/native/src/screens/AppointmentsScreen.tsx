import { useEffect, useState } from "react";
import useApiClient from "src/hooks/useApiClient";
import { AppointmentWithIncludes } from "../../../api/dist/src/types/Appointment";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import AppointmentCard from "src/components/AppointmentCard";
import Header from "src/components/Header";
import { useLoading } from "src/context/LoadingContext";

export default function AppointmentsScreen() {
	const apiClient = useApiClient();
	const [appointments, setAppointments] = useState<AppointmentWithIncludes[]>(
		[]
	);
	const { setIsLoading } = useLoading();

	useEffect(() => {
		async function loadAppointments() {
			setIsLoading(true);
			try {
				const { appointments } =
					await apiClient.appointmentApi.getAllAppointmentsOfUser();

				setAppointments(appointments);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		}

		loadAppointments();
	}, []);

	return (
		<>
			<Header title="Appointments" />
			<ScrollView
				style={styles.container}
				contentContainerStyle={{ gap: 10 }}
			>
				{appointments && appointments.length > 0 ? (
					appointments.map((appointment) => (
						<AppointmentCard
							key={appointment.id}
							appointment={appointment}
						/>
					))
				) : (
					<Text style={styles.noAppointmentsText}>
						You have no appointments
					</Text>
				)}
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	noAppointmentsText: {
		fontSize: 18,
		color: "#4B5563",
		marginBottom: 20,
		textAlign: "center",
	},
});
