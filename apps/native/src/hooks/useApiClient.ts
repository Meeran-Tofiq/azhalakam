import ApiClient from "../../../../packages/api-client/src/index";

export default function useApiClient() {
	const apiClient = new ApiClient(process.env.EXPO_PUBLIC_API_URL); // changed based on PC's IP for the expo go connection
	return apiClient;
}
