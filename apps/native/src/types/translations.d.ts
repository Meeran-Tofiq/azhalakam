interface onboarding {
	title: string;
	description: string;
}

export default interface TranslationKeys {
	greeting: string;
	onboarding: onboarding[];

	next: string;
	getStarted: string;

	usernameOrEmail: string;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	password: string;
	retypePassword: string;

	registerPrompt: string;
	register: string;
	registration: string;

	signInPrompt: string;
	signIn: string;

	skip: string;

	footerHome: string;
	footerAppointments: string;
	footerProfile: string;
}
