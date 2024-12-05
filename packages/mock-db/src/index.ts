import createProducts from "./mock/products";
import createStores from "./mock/stores";
import createUsers from "./mock/users";

async function main() {
	await createUsers();
	await createStores();
	await createProducts();
}

main();
