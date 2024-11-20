import FormFieldConfig from "src/types/FormFieldConfig";
import { Gender, Species } from "../../../api/dist/src/types/PrismaEnums";
import { capitalizeFirstLetter } from "src/utils/stringHandler";
import CustomForm from "./CustomForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { ScrollView } from "react-native";

const petSpeciesArray: Species[] = [
	"CAT",
	"DOG",
	"LIZARD",
	"SNAKE",
	"FISH",
	"HAMSTER",
	"RABBIT",
	"FERRET",
	"GUINEAPIG",
	"HORSE",
	"AMPHIBIAN",
	"INSECT",
	"RODENT",
	"BIRD",
];

const petGenderArray: Gender[] = ["MALE", "FEMALE", "NOT_SPECIFIED"];

let fields: FormFieldConfig[] = [
	{
		name: "name",
		label: "Name",
		keyboardType: "default",
	},
	{
		name: "species",
		label: "Species",
		keyboardType: "default",
		dropDownOptions: petSpeciesArray.map((species) => ({
			label: capitalizeFirstLetter(species.toLocaleLowerCase()),
			value: species,
		})),
	},
	{
		name: "gender",
		label: "Gender",
		keyboardType: "default",
		dropDownOptions: petGenderArray.map((gender) => ({
			label: capitalizeFirstLetter(gender.toLocaleLowerCase()),
			value: gender,
		})),
	},
	{
		name: "weight",
		label: "Weight",
		keyboardType: "numeric",
	},
	{
		name: "notes",
		label: "Notes",
		keyboardType: "default",
	},
	{
		name: "dateOfBirth",
		label: "Date of Birth",
		keyboardType: "default",
		isDate: true,
	},
	{
		name: "lastVetVisit",
		label: "Last Vet Visit",
		keyboardType: "default",
		isDate: true,
	},
];

interface PetFormProps {
	onSubmit: SubmitHandler<FieldValues>;
	submitButtonTitle: string;
	title: string;
}

export default function PetForm({
	onSubmit,
	submitButtonTitle,
	title,
}: PetFormProps) {
	return (
		<ScrollView>
			<CustomForm
				fields={fields}
				onSubmit={onSubmit}
				title={title}
				submitButtonTitle={submitButtonTitle}
				validationRules={{}}
				containerStyle={{ marginTop: 10 }}
			/>
		</ScrollView>
	);
}
