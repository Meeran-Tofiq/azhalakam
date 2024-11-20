import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	ImageSourcePropType,
} from "react-native";
import { StoreWithIncludes } from "../../../api/dist/src/types/Store";

interface StoreCardProps {
	store: StoreWithIncludes & {
		bannerImage?: ImageSourcePropType;
		logoImage?: ImageSourcePropType;
	};
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
	return (
		<View style={styles.storeContainer}>
			<Image
				source={
					store.bannerImage
						? { uri: store.bannerImage }
						: require("../../assets/placeholder-image.png")
				}
				style={styles.bannerImage}
			/>
			<Image
				source={
					store.logoImage
						? { uri: store.logoImage }
						: require("../../assets/placeholder-image.png")
				}
				style={styles.logoImage}
			/>
			<View style={styles.infoContainer}>
				<Text style={styles.storeName}>{store.name}</Text>
				<Text style={styles.storeType}>
					{store.type.replace("_", " ")}
				</Text>
				{store.avgRating !== undefined && (
					<Text style={styles.storeRating}>
						{store.avgRating
							? `${store.avgRating.toFixed(1)}/5.0`
							: "No ratings yet"}
					</Text>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	storeContainer: {
		padding: 20,
		backgroundColor: "#fff",
		borderRadius: 10,
		elevation: 2,
		marginVertical: 10,
	},
	bannerImage: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
		borderRadius: 10,
	},
	logoImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginTop: -50,
		alignSelf: "center",
		borderWidth: 3,
		borderColor: "#fff",
	},
	infoContainer: {
		marginTop: 10,
		alignItems: "center",
	},
	storeName: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#1F2937",
		textAlign: "center",
	},
	storeType: {
		fontSize: 16,
		color: "#4B5563",
		marginTop: 5,
		textAlign: "center",
	},
	storeRating: {
		fontSize: 16,
		color: "#4B5563",
		marginTop: 5,
		textAlign: "center",
	},
});

export default StoreCard;
