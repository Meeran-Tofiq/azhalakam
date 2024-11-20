import React from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import BackButton from "../components/BackButton";
import FormInput from "../components/FormInput";
import GenericButton from "../components/GenericButton";
import useApiClient from "../hooks/useApiClient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

type FormValues = {
	name: string;
	storeType: "PET_STORE" | "VET_STORE";
};

const StoreCreationScreen = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>({
		defaultValues: {
			name: "",
			storeType: "PET_STORE",
		},
	});
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const apiClient = useApiClient();
	const [focusedField, setFocusedField] = React.useState<string | null>(null);

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			const { name, storeType } = data;

			const storeData = {
				name,
				type: storeType,
				userId: "7b35cd8c-e53a-4f03-8291-0d443db73e8f",
			};

			const response = await apiClient.storeApi.createStore({
				store: storeData,
			});

			Alert.alert("Success", "Store created successfully!");
			reset();
			navigation.goBack();
		} catch (error: any) {
			Alert.alert("Error", error.message || "Failed to create store.");
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.header}>
				<BackButton />
			</View>
			<View style={styles.content}>
				<Text style={styles.title}>Create Your Store</Text>

				<FormInput
					control={control}
					name="name"
					label="Store Name"
					rules={{ required: "Store name is required." }}
					errors={errors}
					focused={focusedField === "name"}
					onFocus={() => setFocusedField("name")}
					onBlur={() => setFocusedField(null)}
				/>

				<View style={styles.pickerContainer}>
					<Text style={styles.label}>Store Type</Text>
					<Controller
						control={control}
						name="storeType"
						render={({ field: { onChange, value } }) => (
							<Picker
								selectedValue={value}
								onValueChange={(itemValue: "PET_STORE" | "VET_STORE") => {
									onChange(itemValue);
								}}
								style={styles.picker}
							>
								<Picker.Item label="Pet Store" value="PET_STORE" />
								<Picker.Item label="Vet Store" value="VET_STORE" />
							</Picker>
						)}
					/>
				</View>

				<GenericButton
					onPress={handleSubmit(onSubmit)}
					label="Submit"
					style={styles.submitButton}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: "#F0F4F8",
		padding: 20,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 20,
	},
	content: {
		flex: 1,
		marginTop: 40,
	},
	title: {
		fontSize: 24,
		color: "#1F2937",
		marginBottom: 20,
		textAlign: "center",
		fontWeight: "bold",
	},
	pickerContainer: {
		marginVertical: 10,
	},
	label: {
		fontSize: 16,
		color: "#1F2937",
		marginBottom: 5,
	},
	picker: {
		height: 50,
		width: "100%",
		backgroundColor: "#fff",
		borderRadius: 5,
	},
	submitButton: {
		marginTop: 20,
		backgroundColor: "#4652cc",
		padding: 15,
		borderRadius: 5,
		alignItems: "center",
	},
});

export default StoreCreationScreen;
