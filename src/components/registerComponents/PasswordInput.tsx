import React, { useEffect, useRef, useState } from 'react';

interface PasswordValidationResult {
	isValid: Boolean;
	messages: {
		length: string | null;
		uppercase: string | null;
		digit: string | null;
		specialChar: string | null;
	};
}

export const PasswordInput = ({
	password,
	setPassword
}: {
	password: string;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const [passwordError, setPasswordError] =
		useState<PasswordValidationResult | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const validatePassword = (password: string): PasswordValidationResult => {
		const requirements = {
			length: password.length >= 8,
			uppercase: /[A-Z]/.test(password),
			digit: /\d/.test(password),
			specialChar: /[!@#$%^&*_]/.test(password)
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
		setPasswordError(validatePassword(password));
	}, [password]);

	return (
		<div className='form-group'>
			<label htmlFor='password'>Password</label>
			<input
				type='password'
				ref={inputRef}
				id='password'
				name='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			{inputRef.current?.matches(':focus') &&
			passwordError &&
			!passwordError.isValid ? (
				<div className='error-message-group'>
					{Object.values(passwordError.messages)
						.filter((message) => message != null)
						.map((message, index) => (
							<div key={index}>{message}</div>
						))}
				</div>
			) : null}
		</div>
	);
};
