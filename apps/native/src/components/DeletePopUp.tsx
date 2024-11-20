import { useState } from "react";
import Popup from "./PopUp";

interface DeletePopUpProps {
	title: string;
	description: string;
	onDelete: () => void;
}

export default function DeletePopUp({
	title,
	description,
	onDelete,
}: DeletePopUpProps) {
	const [visible, setVisible] = useState(true);

	return (
		<Popup
			visible={visible}
			title={title}
			description={description}
			buttons={[
				{
					label: "Cancel",
					onPress: () => setVisible(false),
				},
				{
					label: "Delete",
					onPress: onDelete,
					buttonStyle: {
						backgroundColor: "red",
					},
					textStyle: {
						color: "white",
					},
				},
			]}
			onClose={() => setVisible(false)}
		/>
	);
}
