import PetApi from "./services/petApi";
import StoreApi from "./services/storeApi";
import UserApi, {
	RegisterUserInput,
	UpdateUserInput,
} from "./services/userApi";

const defaultBaseUrl = "http://localhost:3000/api";

export default class ApiClient {
	private baseUrl: string;
	public userApi: UserApi;
	public petApi: PetApi;
	public storeApi: StoreApi;

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
		this.petApi = new PetApi(this.baseUrl);
		this.storeApi = new StoreApi(this.baseUrl);
	}
}

export type { RegisterUserInput, UpdateUserInput };
