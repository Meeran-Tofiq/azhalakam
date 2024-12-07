import createProducts from "./mock/products";
import createStores from "./mock/stores";
import createUsers from "./mock/users";
import createVets from "./mock/vets";
import createVetStores from "./mock/vetStores";

async function main() {
	await createUsers();
	await createStores();
	await createProducts();
	await createVetStores();
	await createVets();
}

main();
