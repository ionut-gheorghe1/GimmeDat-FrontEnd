import { useEffect } from 'react';
import type {
	ConfirmPasswordProps,
	ConfirmPasswordValidationResult
} from '../types';
import { CreateField } from '../CreateField';

export const ConfirmPasswordInput = ({
	name,
	value,
	onChange,
	error,
	setError,
	password
}: ConfirmPasswordProps) => {
	const validateConfirmPassword = (
		password: string,
		value: string
	): ConfirmPasswordValidationResult | null => {
		const requirements = {
			match: password === value
		};

		const isValid = Object.values(requirements).every(Boolean);
		return {
			isValid,
			messages: {
				match: requirements.match ? null : '✗ Passwords do not match'
			}
		};
	};

	useEffect(() => {
		if (setError) {
			setError((prev) => ({
				...prev,
				[name]: validateConfirmPassword(password, value)
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
				label='Confirm Password'
			/>
		</>
	);
};
