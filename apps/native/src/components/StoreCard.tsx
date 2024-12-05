import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	ImageSourcePropType,
} from "react-native";
import { StoreWithIncludes } from "@api-types/Store";
import images from "src/utils/imageImporter";

interface StoreCardProps {
	store: StoreWithIncludes & {
		bannerImage?: ImageSourcePropType;
		logoImage?: ImageSourcePropType;
	};
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
	const image =
		store.type === "VET_STORE" ? images.vetStore : images.petStore;

	return (
		<View style={styles.storeContainer}>
			<Image
				source={store.bannerImage ? { uri: store.bannerImage } : image}
				style={styles.bannerImage}
			/>
			<View style={styles.logoContainer}>
				<Image
					source={store.logoImage ? { uri: store.logoImage } : image}
					style={styles.logoImage}
				/>
				<Text style={styles.storeName}>{store.name}</Text>
			</View>
			<View style={styles.infoContainer}>
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
	logoContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	logoImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginTop: -50,
		alignSelf: "flex-start",
		borderWidth: 3,
		borderColor: "#fff",
		marginLeft: 15,
	},
	infoContainer: {
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "space-around",
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
