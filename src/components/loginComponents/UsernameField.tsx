import type { LoginFieldProps } from '../types';

export const UsernameField = ({ name, value, onChange }: LoginFieldProps) => {
	return (
		<div className='form-group'>
			<label htmlFor={name}>Username</label>
			<input
				type={name}
				id={name}
				name={name}
				value={value}
				placeholder='Username'
				onChange={onChange}
				autoComplete='off'
				required
			/>
		</div>
	);
};
