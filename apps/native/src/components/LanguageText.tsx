import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TextProps } from "react-native";
import TranslationKeys from "../types/translations";
import { use } from "i18next";
import { useLanguageDirection } from "../context/LanguageDirectionContext";

interface LanguageTextProps extends Omit<TextProps, "children"> {
	translationKey: keyof TranslationKeys; // Ensure this matches your i18n keys
}

const LanguageText: React.FC<LanguageTextProps> = ({
	style,
	translationKey,
	...props
}) => {
	const isRtl = useLanguageDirection();
	const { t } = useTranslation();

	// Combine the provided style with the direction-specific styling
	const combinedStyle = StyleSheet.flatten([
		style,
		isRtl ? styles.rtlText : styles.ltrText,
	]);

	return (
		<Text style={combinedStyle} {...props}>
			{t(translationKey)}
		</Text>
	);
};

const styles = StyleSheet.create({
	rtlText: {
		textAlign: "right",
	},
	ltrText: {
		textAlign: "left",
	},
});

export default LanguageText;