import { ImageSourcePropType } from "react-native";

interface Image {
	[key: string]: ImageSourcePropType;
}

// const animal images
const amphibian: Image = require("../../assets/animals/amphibian.jpg");
const bird: Image = require("../../assets/animals/bird.jpg");
const cat: Image = require("../../assets/animals/cat.jpg");
const dog: Image = require("../../assets/animals/dog.jpg");
const ferret: Image = require("../../assets/animals/ferret.jpg");
const fish: Image = require("../../assets/animals/fish.jpg");
const guineaPig: Image = require("../../assets/animals/guineapig.jpg");
const hamster: Image = require("../../assets/animals/hamster.jpg");
const horse: Image = require("../../assets/animals/horse.jpg");
const insect: Image = require("../../assets/animals/insect.jpg");
const lizard: Image = require("../../assets/animals/lizard.jpg");
const mouse: Image = require("../../assets/animals/mouse.jpg");
const snake: Image = require("../../assets/animals/snake.jpg");
const rabbit: Image = require("../../assets/animals/rabbit.jpg");

const images = {
	dog,
	cat,
	rabbit,
	ferret,
	guineaPig,
	snake,
	lizard,
	fish,
	hamster,
	horse,
	amphibian,
	insect,
	mouse,
	bird,
};

export default images;