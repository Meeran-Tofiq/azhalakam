import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Dimensions,
	KeyboardTypeOptions,
} from "react-native";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import FormInput from "../components/FormInput";
import LanguageButton from "../components/LanguageButton";
import LanguageText from "../components/LanguageText";
import TranslationKeys from "src/types/translations";
import FormFieldConfig from "src/types/FormFieldConfig";

const { height } = Dimensions.get("window");

type FormProps = {
	title: string | keyof TranslationKeys;
	fields: FormFieldConfig[];
	validationRules: any;
	onSubmit: SubmitHandler<FieldValues>;
	submitButtonTitle: keyof TranslationKeys | string;
};

const CustomForm = ({
	title,
	fields,
	validationRules,
	onSubmit,
	submitButtonTitle,
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

	return (
		<View style={styles.contentContainer}>
			<LanguageText text={title} style={styles.title} />
			<View style={styles.formContainer}>
				{fields.map((field, index) => (
					<FormInput
						key={index}
						control={control}
						name={field.name}
						label={field.label}
						rules={validationRules[field.name]}
						errors={errors}
						focused={focusedInputs[field.name]}
						onFocus={() => handleFocus(field.name)}
						onBlur={() => handleBlur(field.name)}
						secureTextEntry={field.secureTextEntry}
						keyboardType={field.keyboardType}
					/>
				))}
				<LanguageButton
					title={submitButtonTitle}
					style={styles.button}
					onPress={handleSubmit(onSubmit)}
				/>
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
});

export default CustomForm;
