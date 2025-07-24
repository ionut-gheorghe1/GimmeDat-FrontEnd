export interface RegisterFormData {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}
export interface ErrorTypes {
	username: UsernameValidationResult;
	email: EmailValidationResult;
	password: PasswordValidationResult;
	confirmPassword: ConfirmPasswordValidationResult;
}

export interface RegisterFieldProps {
	name: keyof RegisterFormData;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: ErrorTypes[keyof ErrorTypes];
	setError?: React.Dispatch<React.SetStateAction<ErrorTypes>>;
}

export interface UsernameValidationResult {
	isValid: boolean;
	messages: {
		length: string | null;
		allowedChars: string | null;
		noSpaces: string | null;
		noSpecialStartEnd: string | null;
	};
}

export interface EmailValidationResult {
	isValid: boolean;
	messages: {
		format: string | null;
		domain: string | null;
		tld: string | null;
		validChars: string | null;
	};
}

export interface PasswordValidationResult {
	isValid: Boolean;
	messages: {
		length: string | null;
		uppercase: string | null;
		digit: string | null;
		specialChar: string | null;
	};
}

export interface ConfirmPasswordValidationResult {
	isValid: Boolean;
	messages: {
		match: string | null;
	};
}

export interface ConfirmPasswordProps extends RegisterFieldProps {
	password: string;
}

export interface CreateFieldProps extends RegisterFieldProps {
	type: string;
	id: string;
	label: string;
}

export interface LoginFormData {
	username: string;
	password: string;
}

export interface LoginFieldProps {
	name: keyof LoginFormData;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
