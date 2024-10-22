import UserApi, {
	RegisterUserInput,
	UpdateUserInput,
} from "./services/userApi";

const defaultBaseUrl = "http://localhost:3000/api";

export default class ApiClient {
	private baseUrl: string;
	public userApi: UserApi;

	/**
	 * Constructs an ApiClient instance with a given base URL.
	 * If no base URL is provided, defaults to 'http://localhost:3000/api'.
	 * Initializes the UserApi service with the resolved base URL.
	 *
	 * @param baseUrl Optional custom base URL for the API.
	 */
	constructor(baseUrl?: string) {
		this.baseUrl = baseUrl || defaultBaseUrl;
		this.userApi = new UserApi(this.baseUrl);
	}
}

export type { RegisterUserInput, UpdateUserInput };
