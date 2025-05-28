import { useEffect, useRef, useState } from 'react';

interface ConfirmPasswordValidationResult {
	isValid: Boolean;
	messages: {
		match: string | null;
	};
}

export const ConfirmPasswordInput = ({ password }: { password: string }) => {
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [confirmPasswordError, setConfirmPasswordError] =
		useState<ConfirmPasswordValidationResult | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const validateConfirmPassword = (
		password: string,
		confirmPassword: string
	): ConfirmPasswordValidationResult | null => {
		const requirements = {
			match: password === confirmPassword
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
		setConfirmPasswordError(validateConfirmPassword(password, confirmPassword));
	}, [confirmPassword]);

	return (
		<div className='form-group'>
			<label htmlFor='confirmPassword'>Confirm Password</label>
			<input
				type='password'
				ref={inputRef}
				id='confirmPassword'
				name='confirmPassword'
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				required
			/>
			{inputRef.current?.matches(':focus') &&
			confirmPasswordError &&
			!confirmPasswordError.isValid ? (
				<div className='error-message-group'>
					{Object.values(confirmPasswordError.messages)
						.filter((message) => message != null)
						.map((message, index) => (
							<div key={index}>{message}</div>
						))}
				</div>
			) : null}
		</div>
	);
};
