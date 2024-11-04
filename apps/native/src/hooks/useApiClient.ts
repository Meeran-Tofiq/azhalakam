import ApiClient from "../../../../packages/api-client/src/index";

export default function useApiClient(baseUrl?: string) {
    const apiClient = new ApiClient(baseUrl);
    return apiClient;
}
