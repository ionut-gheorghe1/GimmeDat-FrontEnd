import { useState } from 'react';

export const PasswordField = () => {
	const [password, setPassword] = useState('');

	return (
		<div className='form-group'>
			<label htmlFor='password'>Password</label>
			<input
				type='password'
				id='password'
				name='password'
				placeholder='YourPassword'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
		</div>
	);
};
