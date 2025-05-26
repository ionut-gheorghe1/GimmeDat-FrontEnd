import { useEffect, useRef, useState } from 'react';

interface UsernameValidationResult {
	isValid: boolean;
	messages: {
		length: string | null;
		allowedChars: string | null;
		noSpaces: string | null;
		noSpecialStartEnd: string | null;
	};
}

export const UsernameInput = () => {
	const [username, setUsername] = useState('');
	const [usernameError, setUsernameError] =
		useState<UsernameValidationResult | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const validateUsername = (username: string): UsernameValidationResult => {
		const requirements = {
			length: username.length >= 3 && username.length <= 20,
			allowedChars: /^[a-zA-Z0-9_.-]+$/.test(username),
			noSpaces: !/\s/.test(username),
			noSpecialStartEnd: !/^[_.-]|[_.-]$/.test(username)
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
		setUsernameError(validateUsername(username));
	}, [username]);

	return (
		<div className='form-group'>
			<label htmlFor='username'>Username</label>
			<input
				type='username'
				ref={inputRef}
				id='username'
				name='username'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
			/>
			{inputRef.current?.matches(':focus') &&
			usernameError &&
			!usernameError.isValid ? (
				<div>
					{Object.values(usernameError.messages)
						.filter((message) => message != null)
						.map((message, index) => (
							<div key={index}>{message}</div>
						))}
				</div>
			) : null}
		</div>
	);
};
