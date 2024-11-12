import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { useLanguageDirection } from "../context/LanguageDirectionContext";

/**
 * A React functional component that renders a View with optional styling
 * and direction-specific adjustments based on the current language direction,
 * only for ROW BASED flexDirections. This will not work for anything that has
 * the default ```flexDirection: "column"``` applied to it, and will ruin the
 * layout.
 *
 * @param {ViewProps} props - The properties passed to the View component.
 * @param {object} props.style - Additional styles to be applied to the View.
 * @param {React.ReactNode} props.children - The child components to be rendered within the View.
 */
const LanguageRowView: React.FC<ViewProps> = ({
	style,
	children,
	...props
}) => {
	const { isRtl } = useLanguageDirection();

	// Combine the provided style with the direction-specific styling
	const combinedStyle = StyleSheet.flatten([
		style,
		isRtl ? styles.rtlRowContainer : styles.ltrRowContainer,
	]);

	return (
		<View style={combinedStyle} {...props}>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	rtlRowContainer: {
		flexDirection: "row-reverse",
		textAlign: "right",
	},
	ltrRowContainer: {
		flexDirection: "row",
		textAlign: "left",
	},
});

export default LanguageRowView;
