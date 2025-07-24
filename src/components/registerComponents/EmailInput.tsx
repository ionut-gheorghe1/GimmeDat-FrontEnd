import { useEffect } from 'react';
import type { EmailValidationResult, RegisterFieldProps } from '../types';
import { CreateField } from '../CreateField';

export const EmailInput = ({
	name,
	value,
	onChange,
	error,
	setError
}: RegisterFieldProps) => {
	const validateEmail = (value: string): EmailValidationResult => {
		const requirements = {
			format: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
			domain: /@[^\s@]+\.[^\s@]+$/.test(value),
			tld: /\.\w{2,}$/.test(value),
			validChars: /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value)
		};
		const isValid = Object.values(requirements).every(Boolean);
		return {
			isValid,
			messages: {
				format: requirements.format ? null : '✗ Must be user@domain.com',
				domain: requirements.domain
					? null
					: '✗ Missing domain (e.g., @example.com)',
				tld: requirements.tld ? null : '✗ Invalid TLD (.com, .org, etc.)',
				validChars: requirements.validChars ? null : '✗ Invalid characters'
			}
		};
	};

	useEffect(() => {
		if (setError) {
			setError((prev) => ({
				...prev,
				[name]: validateEmail(value)
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
				type='email'
				id={name}
				label='Email'
			/>
		</>
	);
};
