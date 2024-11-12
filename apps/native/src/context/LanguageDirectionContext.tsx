import React, { createContext, useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

type LanguageDirectionContextType = {
	isRtl: boolean;
};

const LanguageDirectionContext = createContext<
	LanguageDirectionContextType | undefined
>(undefined);

export function LanguageDirectionProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { i18n } = useTranslation();
	const [isRtl, setIsRtl] = useState<boolean>(i18n.dir() === "rtl");

	useEffect(() => {
		setIsRtl(i18n.dir() === "rtl");
	}, [i18n.language]);

	return (
		<LanguageDirectionContext.Provider value={{ isRtl }}>
			{children}
		</LanguageDirectionContext.Provider>
	);
}

export function useLanguageDirection() {
	const context = useContext(LanguageDirectionContext);
	if (context === undefined) {
		throw new Error(
			"useLanguageDirection must be used within a LanguageDirectionProvider"
		);
	}
	return context;
}
