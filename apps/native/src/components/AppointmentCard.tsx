import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppointmentWithIncludes } from "../../../api/dist/src/types/Appointment";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native-elements";
import { DateFormats, formatDate } from "src/utils/dateFormatter";
import useApiClient from "src/hooks/useApiClient";

interface AppointmentCardProps {
	appointment: AppointmentWithIncludes;
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
	const apiClient = useApiClient();
	async function cancelAppoinment() {
		try {
			await apiClient.appointmentApi.updateAppointment({
				id: appointment.id,
				updateData: {
					status: "CANCELLED",
				},
			});
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<View style={styles.cardContainer}>
			<LinearGradient
				colors={["#4552CB", "#4596EA"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={styles.gradient}
			/>
			<View>
				<View style={styles.textContainer}>
					<Text style={styles.text}>Store: </Text>
					<Text style={styles.text}>
						{appointment.vetStore.store.name}
					</Text>
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.text}>Date: </Text>
					<Text style={styles.text}>
						{formatDate(appointment.date, DateFormats.DATETIME)}
					</Text>
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.text}>Duration: </Text>
					<Text style={styles.text}>{appointment.duration}</Text>
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.text}>Status: </Text>
					<Text style={styles.text}>{appointment.status}</Text>
				</View>
			</View>

			{appointment.status !== "CANCELLED" && (
				<View style={styles.cancelButtonContainer}>
					<TouchableOpacity
						style={styles.cancelButton}
						onPress={cancelAppoinment}
					>
						<Text style={[styles.text, { textAlign: "center" }]}>
							Cancel
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		position: "relative",
		borderRadius: 10,
		padding: 10,
		justifyContent: "center",
		overflow: "hidden",
	},
	gradient: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	textContainer: {
		flexDirection: "row",
		width: "99.9%",
		justifyContent: "space-between",
	},
	text: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	cancelButtonContainer: {
		padding: 10,
		borderTopColor: "#E0E0E0",
		borderTopWidth: 1,
		marginTop: 10,
	},
	cancelButton: {
		padding: 10,
		backgroundColor: "#dd0000",
		borderRadius: 10,
	},
});
