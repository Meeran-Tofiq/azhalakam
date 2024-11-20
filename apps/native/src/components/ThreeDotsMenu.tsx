import React, { useState } from "react";
import {
	View,
	TouchableOpacity,
	Modal,
	StyleSheet,
	Text,
	Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

type ThreeDotsMenuProps = {
	menuItems: {
		label: string;
		onPress: () => void;
		icon?: string;
		labelColor?: string;
	}[];
	iconStyle?: object;
	modalStyle?: object;
	itemStyle?: object;
};

const ThreeDotsMenu: React.FC<ThreeDotsMenuProps> = ({
	menuItems,
	iconStyle,
	modalStyle,
	itemStyle,
}) => {
	const [visible, setVisible] = useState(false);

	const toggleMenu = () => {
		setVisible(!visible);
	};

	return (
		<View>
			<TouchableOpacity onPress={toggleMenu}>
				<Icon
					name="ellipsis"
					size={20}
					style={[styles.icon, iconStyle]}
				/>
			</TouchableOpacity>
			<Modal
				transparent={true}
				visible={visible}
				animationType="fade"
				onRequestClose={toggleMenu}
			>
				<Pressable style={styles.overlay} onPress={toggleMenu} />
				<View style={[styles.menuContainer, modalStyle]}>
					{menuItems.map((item, index) => (
						<TouchableOpacity
							key={index}
							onPress={() => {
								item.onPress();
								toggleMenu();
							}}
							style={[styles.menuItem, itemStyle]}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								{item.icon && (
									<Icon
										name={item.icon}
										style={[
											styles.icon,
											{ color: item.labelColor },
										]}
									/>
								)}
								<Text
									style={[
										styles.menuText,
										{ color: item.labelColor },
									]}
								>
									{item.label}
								</Text>
							</View>
						</TouchableOpacity>
					))}
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	icon: {
		color: "white",
		padding: 10,
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	menuContainer: {
		position: "absolute",
		top: 50,
		right: 20,
		backgroundColor: "white",
		borderRadius: 10,
		elevation: 5,
		paddingVertical: 0,
		paddingHorizontal: 0,
	},
	menuItem: {
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	menuText: {
		fontSize: 16,
		color: "#333",
	},
});

export default ThreeDotsMenu;
