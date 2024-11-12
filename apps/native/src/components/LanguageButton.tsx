import React from "react";
import { useTranslation } from "react-i18next";
import { ButtonProps, ViewStyle } from "react-native";
import { Button } from "react-native-elements";
import TranslationKeys from "../types/translations";

interface LanguageButtonProps extends ButtonProps {
	title: keyof TranslationKeys | string;
	style?: ViewStyle;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({
	style,
	title,
	...props
}) => {
	const { t } = useTranslation();

	return (
		<Button
			buttonStyle={style}
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
