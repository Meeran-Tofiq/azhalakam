import React from "react";
import { View, Text, StyleSheet, KeyboardTypeOptions } from "react-native";
import { Controller } from "react-hook-form";
import LanguageText from "./LanguageText";
import LanguageTextInput from "./LanguageTextInput";
import { useTranslation } from "react-i18next";
import TranslationKeys from "src/types/translations";

interface FormInputProps {
	control: any;
	name: keyof TranslationKeys | string;
	label: keyof TranslationKeys | string;
	rules?: any;
	errors: any;
	focused: boolean;
	onFocus: () => void;
	onBlur: () => void;
	secureTextEntry?: boolean;
	keyboardType?: KeyboardTypeOptions;
}

const isTranslationKey = (key: string): key is keyof TranslationKeys => {
	return (key as keyof TranslationKeys) !== undefined;
};

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
	const { t } = useTranslation();

	const renderLabel = () =>
		isTranslationKey(label) ? (
			<LanguageText
				text={label as keyof TranslationKeys}
				style={styles.label}
			/>
		) : (
			<Text style={styles.label}>{label}</Text>
		);

	const value = "value";
	const onChange = () => {};

	return (
		<View>
			{renderLabel()}
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({ field: { onChange, value } }) => (
					<>
						<LanguageTextInput
							style={[
								styles.input,
								focused && styles.inputFocused,
								errors[name] && { borderBottomColor: "red" }, // Red border if error
							]}
							onFocus={onFocus}
							onBlur={onBlur}
							placeholder={
								isTranslationKey(name)
									? t(name)
									: (label as string)
							}
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
					</>
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
		borderBottomColor: "#f0f0f8",
		borderBottomWidth: 1,
		marginBottom: 15,
		width: "100%",
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
