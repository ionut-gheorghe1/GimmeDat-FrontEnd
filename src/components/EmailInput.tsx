import { useEffect, useRef, useState } from 'react';

interface EmailValidationResult {
	isValid: boolean;
	messages: {
		format: string | null;
		domain: string | null;
		tld: string | null;
		validChars: string | null;
	};
}

export const EmailInput = () => {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState<EmailValidationResult | null>(
		null
	);
	const inputRef = useRef<HTMLInputElement>(null);
	const validateEmail = (email: string): EmailValidationResult => {
		const requirements = {
			format: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
			domain: /@[^\s@]+\.[^\s@]+$/.test(email),
			tld: /\.\w{2,}$/.test(email),
			validChars: /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)
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
		setEmailError(validateEmail(email));
	}, [email]);

	return (
		<div className='form-group'>
			<label htmlFor='email'>Email</label>
			<input
				type='email'
				ref={inputRef}
				id='email'
				name='email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			{inputRef.current?.matches(':focus') &&
			emailError &&
			!emailError.isValid ? (
				<div>
					{Object.values(emailError.messages)
						.filter((message) => message != null)
						.map((message, index) => (
							<div key={index}>{message}</div>
						))}
				</div>
			) : null}
		</div>
	);
};
