import { useEffect } from 'react';
import type { RegisterFieldProps, UsernameValidationResult } from '../types';
import { CreateField } from '../CreateField';

export const UsernameInput = ({
	name,
	value,
	onChange,
	error,
	setError
}: RegisterFieldProps) => {
	const validateUsername = (value: string): UsernameValidationResult => {
		const requirements = {
			length: value.length >= 3 && value.length <= 20,
			allowedChars: /^[a-zA-Z0-9_.-]+$/.test(value),
			noSpaces: !/\s/.test(value),
			noSpecialStartEnd: !/^[_.-]|[_.-]$/.test(value)
		};
		const isValid = Object.values(requirements).every(Boolean);
		return {
			isValid,
			messages: {
				length: requirements.length ? null : '✗ Must be 3-20 characters',
				allowedChars: requirements.allowedChars
					? null
					: '✗ Only letters, numbers, _ . -',
				noSpaces: requirements.noSpaces ? null : '✗ No spaces allowed',
				noSpecialStartEnd: requirements.noSpecialStartEnd
					? null
					: '✗ Cannot start/end with _ . -'
			}
		};
	};

	useEffect(() => {
		if (setError) {
			setError((prev) => ({
				...prev,
				[name]: validateUsername(value)
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
				type='username'
				id={name}
				label='Username'
			/>
		</>
	);
};
