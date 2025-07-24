import { useEffect } from 'react';
import type { RegisterFieldProps, PasswordValidationResult } from '../types';
import { CreateField } from '../CreateField';

export const PasswordInput = ({
	name,
	value,
	onChange,
	error,
	setError
}: RegisterFieldProps) => {
	const validatePassword = (value: string): PasswordValidationResult => {
		const requirements = {
			length: value.length >= 8,
			uppercase: /[A-Z]/.test(value),
			digit: /\d/.test(value),
			specialChar: /[!@#$%^&*_]/.test(value)
		};
		const isValid = Object.values(requirements).every(Boolean);

		return {
			isValid,
			messages: {
				length: requirements.length ? null : '✗ 8+ characters',
				uppercase: requirements.uppercase ? null : '✗ Uppercase letter',
				digit: requirements.digit ? null : '✗ 1+ number',
				specialChar: requirements.specialChar
					? null
					: '✗ 1+ special character (!@#$%^&*_)'
			}
		};
	};
	useEffect(() => {
		if (setError) {
			setError((prev) => ({
				...prev,
				[name]: validatePassword(value)
			}));
		}
	}, [value]);

	return (
		<>
			<CreateField
				name={name}
				value={value}
				onChange={onChange}
				error={error}
				type='password'
				id={name}
				label='Password'
			/>
		</>
	);
};
