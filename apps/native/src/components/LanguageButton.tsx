import React from "react";
import { useTranslation } from "react-i18next";
import { ButtonProps, TextStyle, ViewStyle } from "react-native";
import { Button } from "react-native-elements";
import TranslationKeys from "../types/translations";

interface LanguageButtonProps extends ButtonProps {
	title: keyof TranslationKeys | string;
	style?: ViewStyle;
	textStyle?: TextStyle;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({
	style,
	textStyle,
	title,
	...props
}) => {
	const { t } = useTranslation();

	return (
		<Button
			buttonStyle={style}
			titleStyle={textStyle}
			{...props}
			title={
				(title as keyof TranslationKeys) !== undefined
					? t(title)
					: title
			}
		/>
	);
};

export default LanguageButton;
