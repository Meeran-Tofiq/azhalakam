import FormFieldConfig from "src/types/FormFieldConfig";
import { Gender, Species } from "../../../api/dist/src/types/PrismaEnums";
import { capitalizeFirstLetter } from "src/utils/stringHandler";
import CustomForm from "./CustomForm";
import { FieldValues, SubmitHandler } from "react-hook-form";

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
		<CustomForm
			fields={fields}
			onSubmit={onSubmit}
			title={title}
			submitButtonTitle={submitButtonTitle}
			validationRules={{}}
			containerStyle={{ marginTop: 10 }}
		/>
	);
}
