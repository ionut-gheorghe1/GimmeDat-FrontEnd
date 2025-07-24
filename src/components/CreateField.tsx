import { useRef } from 'react';
import type { CreateFieldProps } from './types';

export const CreateField = ({
	name,
	value,
	onChange,
	error,
	type,
	id,
	label
}: CreateFieldProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	return (
		<div className='form-group'>
			<label htmlFor={type}>{label}</label>
			<input
				type={type}
				ref={inputRef}
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				required
			/>
			{inputRef.current?.matches(':focus') && error && !error.isValid ? (
				<div className='error-message-group'>
					{Object.values(error.messages)
						.filter((message) => message != null)
						.map((message, index) => (
							<div key={index}>{message}</div>
						))}
				</div>
			) : null}
		</div>
	);
};
