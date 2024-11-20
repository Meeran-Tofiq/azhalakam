// FooterContext.tsx
import React, { createContext, useContext, useState } from "react";
import { navigationRef } from "../navigation/NavigationService";

export enum FooterPageNames {
	Home = "MainPage",
	Appointments = "Appointments",
	Profile = "Profile",
}

interface FooterContextProps {
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
	activeIcon: FooterPageNames;
	setActiveIcon: (icon: FooterPageNames) => void;
}

const FooterContext = createContext<FooterContextProps | undefined>(undefined);

export const FooterProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const [activeIcon, setActiveIcon] = useState<FooterPageNames>(
		FooterPageNames.Home
	);

	return (
		<FooterContext.Provider
			value={{ isVisible, setIsVisible, activeIcon, setActiveIcon }}
		>
			{children}
		</FooterContext.Provider>
	);
};

export const useFooterContext = () => {
	const context = useContext(FooterContext);
	if (!context) {
		throw new Error(
			"useFooterContext must be used within a FooterProvider"
		);
	}
	return context;
};
