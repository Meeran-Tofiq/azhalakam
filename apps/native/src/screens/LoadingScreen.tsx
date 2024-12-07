import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { View, Image, Animated, StyleSheet, ViewStyle } from "react-native";

const positions: { top: number; left: number }[] = [
	{ top: 500, left: 240 },
	{ top: 450, left: 170 },
	{ top: 380, left: 205 },
	{ top: 330, left: 135 },
	{ top: 260, left: 170 },
	{ top: 210, left: 100 },
];

export default function LoadingScreen() {
	const numberOfPaws = 6; // Number of paw images
	const animationDuration = 1000; // Duration of fade in/out for each paw
	const delayBetweenPaws = 150; // Delay between each paw starting its animation

	// Reference to Animated.Value array for opacity
	const pawAnimations = useRef<Animated.Value[]>(
		Array.from({ length: numberOfPaws }, () => new Animated.Value(0))
	).current;

	useEffect(() => {
		const createSequentialAnimation = () => {
			// Build a sequence of animations
			const animationSequence = pawAnimations.map((opacity, index) => {
				return Animated.sequence([
					Animated.delay(index * delayBetweenPaws), // Delay for this paw
					Animated.timing(opacity, {
						toValue: 1,
						duration: animationDuration / 2,
						useNativeDriver: true,
					}),
					Animated.delay(animationDuration / 2), // Stay visible
					Animated.timing(opacity, {
						toValue: 0,
						duration: animationDuration / 2,
						useNativeDriver: true,
					}),
				]);
			});

			// Loop the entire sequence
			Animated.loop(
				Animated.stagger(delayBetweenPaws, animationSequence)
			).start();
		};

		createSequentialAnimation();
	}, []);

	// Get position for a specific paw
	const getPawPosition = (
		index: number
	): {
		position: ViewStyle["position"];
		left: number;
		top: number;
	} => ({
		position: "absolute",
		...positions[index],
	});

	return (
		<View style={styles.container}>
			<LinearGradient
				colors={["#4552CB", "#4596EA"]}
				start={{ x: 1, y: 1 }}
				end={{ x: 0, y: 0 }}
				style={StyleSheet.absoluteFill} // Ensure gradient covers the entire screen
			/>
			{pawAnimations.map((opacity, index) => (
				<Animated.View
					key={index}
					style={[getPawPosition(index), { opacity }]}
				>
					<Image
						source={require("../../assets/paw.png")} // Replace with your paw image path
						style={styles.pawImage}
					/>
				</Animated.View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	pawImage: {
		width: 50,
		height: 50,
	},
});
