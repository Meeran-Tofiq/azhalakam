import AppointmentApi from "./services/appointmentApi";
import LocationApi from "./services/locationApi";
import PetApi from "./services/petApi";
import ProductApi from "./services/productApi";
import ReviewApi from "./services/reviewApi";
import ServiceApi from "./services/serviceApi";
import ServiceProviderApi from "./services/serviceProviderApi";
import StoreApi from "./services/storeApi";
import UserApi from "./services/userApi";
import VetApi from "./services/vetApi";
import userToken from "./utils/userToken";

const defaultBaseUrl = "http://localhost:3000/api";

export default class ApiClient {
	private baseUrl: string;
	public userApi: UserApi;
	public petApi: PetApi;
	public storeApi: StoreApi;
	public productsApi: ProductApi;
	public locationApi: LocationApi;
	public serviceProviderApi: ServiceProviderApi;
	public serviceApi: ServiceApi;
	public reviewApi: ReviewApi;
	public appointmentApi: AppointmentApi;
	public vetApi: VetApi;

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
		this.serviceProviderApi = new ServiceProviderApi(this.baseUrl);
		this.serviceApi = new ServiceApi(this.baseUrl);
		this.reviewApi = new ReviewApi(this.baseUrl);
		this.appointmentApi = new AppointmentApi(this.baseUrl);
		this.vetApi = new VetApi(this.baseUrl);
	}

	public setUserToken(token: string) {
		userToken.setToken(token);
	}
}
