import ApiClient from "../../../../packages/api-client/src/index";

export default function useApiClient() {
	const apiClient = new ApiClient("http://192.168.3.241:3000/api"); // changed based on PC's IP for the expo go connection
	return apiClient;
}
