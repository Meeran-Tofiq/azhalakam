import React, { useEffect } from "react";
import { Modal } from "react-native";
import CustomForm from "./CustomForm";
import FormFieldConfig from "src/types/FormFieldConfig";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface PopupProps {
	visible: boolean;
	title: string;
	onClose: () => void;
	fields: FormFieldConfig[];
	onSubmit: SubmitHandler<FieldValues>;
	submitButtonTitle: string;
	validationRules: any;
}

const PopUpForm: React.FC<PopupProps> = ({
	visible,
	onClose,
	fields,
	onSubmit,
	submitButtonTitle,
	validationRules,
}) => {
	const { reset } = useForm();

	useEffect(() => {
		if (!visible) {
			// Reset the form when the modal is closed
			reset();
		}
	}, [visible, reset]);

	return (
		<Modal
			transparent={true}
			visible={visible}
			animationType="fade"
			onRequestClose={onClose}
		>
			<CustomForm
				fields={fields}
				onSubmit={onSubmit}
				title={""}
				submitButtonTitle={submitButtonTitle}
				validationRules={validationRules}
			/>
		</Modal>
	);
};

export default PopUpForm;
