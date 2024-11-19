import { KeyboardTypeOptions } from "react-native";

type FormFieldConfig = {
	name: string;
	label: string;
	secureTextEntry?: boolean;
	keyboardType?: KeyboardTypeOptions;
	dropDownOptions?: { label: string; value: string }[];
};

export default FormFieldConfig;
