/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	testEnvironment: "node",
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest", // Fix regex to correctly match .ts and .tsx files
	},
	testMatch: [
		"**/__tests__/**/*.test.ts", // Match test files in __tests__ directory
		"**/?(*.)+(spec|test).[jt]s?(x)", // Match any .spec or .test files
	],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Specify the file extensions Jest will look for
};
