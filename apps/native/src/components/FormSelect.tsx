import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";

type SelectInputProps = {
	control: any;
	name: string;
	label: string;
	value?: string;
	options: { label: string; value: string }[];
	rules?: object;
	errors?: any;
};

const SelectInput = ({
	control,
	name,
	label,
	value,
	options,
	rules = {},
	errors,
}: SelectInputProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({ field: { onChange } }) => (
					<View style={styles.pickerContainer}>
						<Picker
							selectedValue={value}
							onValueChange={(itemValue) => onChange(itemValue)}
							style={styles.picker}
						>
							{/* Add a default placeholder option */}
							<Picker.Item
								label="Select an option..."
								value={null}
							/>
							{options.map((option, index) => (
								<Picker.Item
									key={index}
									label={option.label}
									value={option.value}
								/>
							))}
						</Picker>
					</View>
				)}
			/>
			{errors?.[name] && (
				<Text style={styles.error}>{errors[name]?.message}</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 15,
	},
	label: {
		color: "#4552CB",
		fontWeight: "bold",
	},
	pickerContainer: {
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		marginTop: 5,
		overflow: "hidden", // Ensures the picker fits nicely in the styled container
	},
	picker: {
		color: "#000",
	},
	error: {
		color: "red",
		fontSize: 12,
		marginTop: 5,
	},
});

export default SelectInput;
