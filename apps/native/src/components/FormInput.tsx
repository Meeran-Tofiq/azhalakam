import React from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	KeyboardTypeOptions,
} from "react-native";
import { Controller } from "react-hook-form";

interface FormInputProps {
	control: any;
	name: string;
	label: string;
	rules?: any;
	errors: any;
	focused: boolean;
	onFocus: () => void;
	onBlur: () => void;
	secureTextEntry?: boolean;
	keyboardType?: KeyboardTypeOptions;
}

const FormInput: React.FC<FormInputProps> = ({
	control,
	name,
	label,
	rules,
	errors,
	focused,
	onFocus,
	onBlur,
	secureTextEntry,
	keyboardType,
}) => {
	return (
		<View>
			<Text style={styles.label}>{label}</Text>
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({ field: { onChange, value } }) => (
					<View>
						<TextInput
							style={[
								styles.input,
								focused && styles.inputFocused,
								errors[name] && { borderBottomColor: "red" }, // Red border if error
							]}
							onFocus={onFocus}
							onBlur={onBlur}
							placeholder={label}
							value={value}
							onChangeText={onChange}
							secureTextEntry={secureTextEntry}
							keyboardType={keyboardType}
						/>
						{errors[name] && (
							<Text style={styles.errorText}>
								{errors[name]?.message}
							</Text>
						)}
					</View>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	label: {
		color: "#4552CB",
		fontWeight: "bold",
	},
	input: {
		width: "100%",
		borderBottomColor: "#f0f0f8",
		borderBottomWidth: 1,
		marginBottom: 15,
	},
	inputFocused: {
		borderBottomColor: "#4552CB",
		borderBottomWidth: 2,
	},
	errorText: {
		color: "red",
		marginTop: -15,
		marginBottom: 8,
	},
});

export default FormInput;
