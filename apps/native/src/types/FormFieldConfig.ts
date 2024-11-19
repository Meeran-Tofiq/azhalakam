import { KeyboardTypeOptions } from "react-native";

type FormFieldConfig = {
	name: string;
	label: string;
	secureTextEntry?: boolean;
	keyboardType?: KeyboardTypeOptions;
};

export default FormFieldConfig;