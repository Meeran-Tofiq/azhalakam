import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { useLanguageDirection } from "../context/LanguageDirectionContext";

const LanguageTextInput: React.FC<TextInputProps> = ({
	children,
	style,
	...props
}) => {
	const { isRtl } = useLanguageDirection();

	// Combine the provided style with the direction-specific styling
	const combinedStyle = StyleSheet.flatten([
		style,
		isRtl ? styles.rtlInputField : {},
	]);

	return (
		<TextInput style={combinedStyle} {...props}>
			{children}
		</TextInput>
	);
};

const styles = StyleSheet.create({
	rtlInputField: {
		textAlign: "right",
	},
});

export default LanguageTextInput;
