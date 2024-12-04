import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LanguageRowView from "./LanguageView";

type PaginatedListProps = {
	children: React.ReactNode;
	currentPage: number;
	hasMore: boolean;
	onPageChange: (newPage: number) => void;
};

const PaginatedList = ({
	children,
	currentPage,
	hasMore,
	onPageChange,
}: PaginatedListProps) => {
	return (
		<View style={styles.container}>
			{children}

			<LanguageRowView style={styles.pagination}>
				{currentPage > 1 && (
					<TouchableOpacity
						style={styles.arrow}
						onPress={() => onPageChange(currentPage - 1)}
					>
						<Text style={styles.arrowText}>{"<"}</Text>
					</TouchableOpacity>
				)}
				<Text style={styles.pageText}>{currentPage}</Text>
				{hasMore && (
					<TouchableOpacity
						style={styles.arrow}
						onPress={() => onPageChange(currentPage + 1)}
					>
						<Text style={styles.arrowText}>{">"}</Text>
					</TouchableOpacity>
				)}
			</LanguageRowView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		marginBottom: 20,
	},
	pagination: {
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	arrow: {
		marginHorizontal: 20,
	},
	arrowText: {
		fontSize: 24,
		fontWeight: "bold",
	},
	pageText: {
		fontSize: 18,
		color: "#4552CB",
	},
});

export default PaginatedList;
