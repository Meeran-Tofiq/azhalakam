import FormFieldConfig from "src/types/FormFieldConfig";
import { StoreType, Species } from "../../../api/dist/src/types/PrismaEnums";
import { capitalizeFirstLetter } from "src/utils/stringHandler";
import CustomForm from "./CustomForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { ScrollView } from "react-native";
import { StoreWithIncludes } from "../../../api/dist/src/types/Store";

const storeTypesArray: StoreType[] = ["PET_STORE", "VET_STORE"];
const storeSpeciesArray: Species[] = [
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

let fields: FormFieldConfig[] = [
	{
		name: "name",
		label: "Name",
		keyboardType: "default",
	},
	{
		name: "species",
		label: "Species the vet clinic can care for",
		keyboardType: "default",
		dropDownOptions: storeSpeciesArray.map((species) => ({
			label: capitalizeFirstLetter(species.toLocaleLowerCase()),
			value: species,
		})),
	},
	{
		name: "type",
		label: "Type",
		keyboardType: "default",
		dropDownOptions: storeTypesArray.map((type) => ({
			label: capitalizeFirstLetter(
				type.toLocaleLowerCase().replace("_", " ")
			),
			value: type,
		})),
	},
];

interface StoreFormProps {
	onSubmit: SubmitHandler<FieldValues>;
	submitButtonTitle: string;
	title: string;
	store?: StoreWithIncludes;
}

export default function StoreForm({
	onSubmit,
	submitButtonTitle,
	title,
	store,
}: StoreFormProps) {
	return (
		<ScrollView>
			<CustomForm
				fields={fields}
				onSubmit={onSubmit}
				title={title}
				submitButtonTitle={submitButtonTitle}
				validationRules={{}}
				containerStyle={{ marginTop: 10 }}
				item={store}
			/>
		</ScrollView>
	);
}
