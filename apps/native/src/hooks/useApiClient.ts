import ApiClient from "../../../../packages/api-client/src/index";

let apiClient: ApiClient;

export default function useApiClient() {
	if (!apiClient) apiClient = new ApiClient(process.env.EXPO_PUBLIC_API_URL); // changed based on PC's IP for the expo go connection
	return apiClient;
}
