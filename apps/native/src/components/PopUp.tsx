import React from "react";
import {
	View,
	Text,
	Modal,
	TouchableOpacity,
	StyleSheet,
	ViewStyle,
	TextStyle,
} from "react-native";

type PopupButton = {
	label: string;
	onPress: () => void;
	buttonStyle?: ViewStyle;
	textStyle?: TextStyle;
};

interface PopupProps {
	visible: boolean;
	title: string;
	description?: string;
	buttons: PopupButton[];
	onClose: () => void;
	popupStyle?: ViewStyle;
	titleStyle?: TextStyle;
	descriptionStyle?: TextStyle;
}

const Popup: React.FC<PopupProps> = ({
	visible,
	title,
	description,
	buttons,
	onClose,
	popupStyle,
	titleStyle,
	descriptionStyle,
}) => {
	return (
		<Modal
			transparent={true}
			visible={visible}
			animationType="fade"
			onRequestClose={onClose}
		>
			<View style={styles.overlay}>
				<View style={[styles.popupContainer, popupStyle]}>
					<Text style={[styles.title, titleStyle]}>{title}</Text>
					{description && (
						<Text style={[styles.description, descriptionStyle]}>
							{description}
						</Text>
					)}
					<View style={styles.buttonContainer}>
						{buttons.map((button, index) => (
							<TouchableOpacity
								key={index}
								onPress={button.onPress}
								style={[styles.button, button.buttonStyle]}
							>
								<Text
									style={[
										styles.buttonText,
										button.textStyle,
									]}
								>
									{button.label}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	popupContainer: {
		width: "80%",
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		alignItems: "center",
		elevation: 5,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	description: {
		fontSize: 14,
		color: "#666",
		textAlign: "center",
		marginBottom: 20,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		width: "100%",
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: "#468ae6",
		borderRadius: 5,
		marginHorizontal: 10,
	},
	buttonText: {
		color: "white",
		fontSize: 14,
	},
});

export default Popup;
