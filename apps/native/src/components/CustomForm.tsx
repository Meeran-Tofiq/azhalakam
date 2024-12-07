import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ViewStyle } from "react-native";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import FormInput from "../components/FormInput";
import LanguageButton from "../components/LanguageButton";
import LanguageText from "../components/LanguageText";
import TranslationKeys from "src/types/translations";
import FormFieldConfig from "src/types/FormFieldConfig";
import SelectInput from "./FormSelect";
import DateInput from "./DateInput";

const { height } = Dimensions.get("window");

type FormProps = {
	title: string | keyof TranslationKeys;
	fields: FormFieldConfig[];
	validationRules: any;
	onSubmit: SubmitHandler<FieldValues>;
	submitButtonTitle: keyof TranslationKeys | string;
	containerStyle?: ViewStyle;
	item?: any;
};

function extractDefaultsFromItem(item: any, fields: FormFieldConfig[]) {
	const extractedFields = fields.map((field) => {
		return {
			...field,
			value: item[field.name],
		};
	});

	return extractedFields;
}

const CustomForm = ({
	title,
	fields,
	validationRules,
	onSubmit,
	submitButtonTitle,
	containerStyle,
	item,
}: FormProps) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [focusedInputs, setFocusedInputs] = useState<{
		[key: string]: boolean;
	}>({});

	const handleFocus = (field: string) => {
		setFocusedInputs({ ...focusedInputs, [field]: true });
	};

	const handleBlur = (field: string) => {
		setFocusedInputs({ ...focusedInputs, [field]: false });
	};

	if (item) {
		fields = extractDefaultsFromItem(item, fields);
	}

	return (
		<View style={[styles.contentContainer, containerStyle]}>
			<LanguageText text={title} style={styles.title} />
			<View style={styles.formContainer}>
				{fields.map((field, index) =>
					field.dropDownOptions ? (
						<SelectInput
							key={index}
							control={control}
							name={field.name}
							label={field.label}
							value={field.value as string}
							options={field.dropDownOptions}
							rules={validationRules[field.name]}
							errors={errors}
						/>
					) : field.isDate ? (
						<DateInput
							key={index}
							control={control}
							name={field.name}
							label={field.label}
							value={
								field.value ? new Date(field.value) : undefined
							}
							rules={validationRules[field.name]}
							errors={errors}
							mode={field.dateMode}
						/>
					) : (
						<FormInput
							key={index}
							control={control}
							name={field.name}
							label={field.label}
							value={field.value ? String(field.value) : ""}
							rules={validationRules[field.name]}
							errors={errors}
							secureTextEntry={field.secureTextEntry}
							keyboardType={field.keyboardType}
							onFocus={() => handleFocus(field.name)}
							onBlur={() => handleBlur(field.name)}
							focused={focusedInputs[field.name] || false}
						/>
					)
				)}
				<View style={styles.buttonContainer}>
					<LanguageButton
						title={submitButtonTitle}
						style={styles.button}
						onPress={handleSubmit(onSubmit)}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		marginTop: height * 0.1,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#fff",
	},
	formContainer: {
		width: "100%",
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 20,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5,
		marginBottom: 20,
	},
	button: {
		backgroundColor: "#468ae6",
		borderRadius: 28,
		width: "100%",
		paddingVertical: 15,
	},
	buttonContainer: {
		borderTopColor: "#ccc",
		borderTopWidth: 1,
		paddingTop: 10,
		marginTop: 10,
	},
	dateInputContainer: {
		marginVertical: 10,
	},
	errorText: {
		color: "red",
		fontSize: 12,
	},
});

export default CustomForm;
