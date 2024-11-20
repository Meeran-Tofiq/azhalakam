import { KeyboardTypeOptions } from "react-native";

type FormFieldConfig = {
	name: string;
	label: string;
	value?: string | number | Date;
	secureTextEntry?: boolean;
	keyboardType?: KeyboardTypeOptions;
	dropDownOptions?: { label: string; value: string }[];
	isDate?: boolean;
};

export default FormFieldConfig;
