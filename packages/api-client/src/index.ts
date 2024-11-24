import LocationApi from "./services/locationApi";
import PetApi from "./services/petApi";
import ProductApi from "./services/productApi";
import ServiceApi from "./services/serviceApi";
import StoreApi from "./services/storeApi";
import UserApi from "./services/userApi";
import userToken from "./utils/userToken";

const defaultBaseUrl = "http://localhost:3000/api";

export default class ApiClient {
	private baseUrl: string;
	public userApi: UserApi;
	public petApi: PetApi;
	public storeApi: StoreApi;
	public productsApi: ProductApi;
	public locationApi: LocationApi;
	public serviceApi: ServiceApi;

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
		this.productsApi = new ProductApi(this.baseUrl);
		this.locationApi = new LocationApi(this.baseUrl);
		this.serviceApi = new ServiceApi(this.baseUrl);
	}

	public setUserToken(token: string) {
		userToken.setToken(token);
	}
}
