import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import LanguageText from "./LanguageText";
import LanguageButton from "./LanguageButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import TranslationKeys from "src/types/translations";
import { DateFormats, formatDate } from "src/utils/dateFormatter";

interface DateInputProps {
	control: any;
	name: keyof TranslationKeys | string;
	label: keyof TranslationKeys | string;
	rules?: any;
	errors: any;
}

export default function DateInput({
	control,
	name,
	label,
	errors,
	rules,
}: DateInputProps) {
	const [showPicker, setShowPicker] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const handleDateChange = (
		onChange: (value: any) => void,
		event: any,
		date?: Date
	) => {
		setShowPicker(false);
		if (event.type === "set" && date) {
			setSelectedDate(date);
			onChange(date.toISOString()); // Send ISO string to form
		} else if (event.type === "dismissed") {
			onChange(null); // Ensure value is null
		}
	};

	return (
		<View style={styles.container}>
			<LanguageText text={label} style={styles.label} />
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({ field: { onChange } }) => (
					<>
						<LanguageButton
							title={
								selectedDate
									? formatDate(
											selectedDate,
											DateFormats.DAY_MONTH_YEAR
										)
									: "Select Date"
							}
							onPress={() => setShowPicker(true)}
							style={styles.button}
						/>
						{showPicker && (
							<DateTimePicker
								value={selectedDate || new Date()}
								mode="date"
								display="default"
								onChange={(event, date) =>
									handleDateChange(onChange, event, date)
								}
							/>
						)}
					</>
				)}
			/>
			{errors && errors[name] && (
				<LanguageText
					text={errors[name]?.message}
					style={styles.errorText}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 15,
	},
	label: {
		color: "#4552CB",
		fontWeight: "bold",
	},
	button: {
		backgroundColor: "#468ae6",
		borderRadius: 28,
		marginTop: 10,
		width: "80%",
		marginHorizontal: "auto",
	},
	errorText: {
		color: "red",
		fontSize: 12,
		marginTop: 5,
	},
});
