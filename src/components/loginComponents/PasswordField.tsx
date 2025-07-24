import type { LoginFieldProps } from '../types';

export const PasswordField = ({ name, value, onChange }: LoginFieldProps) => {
	return (
		<div className='form-group'>
			<label htmlFor={name}>Password</label>
			<input
				type={name}
				id={name}
				name={name}
				placeholder='YourPassword'
				value={value}
				onChange={onChange}
				required
			/>
		</div>
	);
};
