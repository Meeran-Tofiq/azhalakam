import { format } from "date-fns";

export enum DateFormats {
	DEFAULT = "MMMM d, yyyy",
	YEAR_MONTH_DAY = "yyyy-MM-dd",
	DAY_MONTH_YEAR = "dd-MM-yyyy",
}

export function formatDate(date: Date, dateFormat?: DateFormats): string {
	return format(date, dateFormat ? dateFormat : DateFormats.DEFAULT);
}
