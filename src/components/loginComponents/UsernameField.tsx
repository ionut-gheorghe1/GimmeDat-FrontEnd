import { useState } from 'react';

export const UsernameField = () => {
	const [username, setUsername] = useState('');

	return (
		<div className='form-group'>
			<label htmlFor='username'>Username</label>
			<input
				type='username'
				id='username'
				name='username'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
			/>
		</div>
	);
};
