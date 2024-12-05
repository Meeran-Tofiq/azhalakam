import React, { useRef } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from "react-native";
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
	const scrollViewRef = useRef<ScrollView>(null);

	const handlePageChange = (newPage: number) => {
		scrollViewRef.current?.scrollTo({ y: 0, animated: true });
		onPageChange(newPage);
	};

	return (
		<View style={styles.container}>
			<ScrollView
				ref={scrollViewRef}
				contentContainerStyle={styles.content}
			>
				{children}

				<LanguageRowView style={styles.pagination}>
					{currentPage > 1 && (
						<TouchableOpacity
							style={styles.arrow}
							onPress={() => handlePageChange(currentPage - 1)}
						>
							<Text style={styles.arrowText}>{"<"}</Text>
						</TouchableOpacity>
					)}
					<Text style={styles.pageText}>{currentPage}</Text>
					{hasMore && (
						<TouchableOpacity
							style={styles.arrow}
							onPress={() => handlePageChange(currentPage + 1)}
						>
							<Text style={styles.arrowText}>{">"}</Text>
						</TouchableOpacity>
					)}
				</LanguageRowView>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flexGrow: 1,
		padding: 10,
	},
	pagination: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
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
