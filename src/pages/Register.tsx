import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import { PasswordInput } from '../components/PasswordInput';
import { EmailInput } from '../components/EmailInput';
import { UsernameInput } from '../components/UsernameInput';
import { ConfirmPasswordInput } from '../components/ConfirmPasswordInput';

export const Register = () => {
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
	};

	return (
		<div className='register-container'>
			<h1>Create your account!</h1>
			<form onSubmit={handleSubmit}>
				<UsernameInput />
				<EmailInput />
				<PasswordInput password={password} setPassword={setPassword} />
				<ConfirmPasswordInput password={password} />

				<button
					type='submit'
					id='submitBtn'
					name='submitBtn'
					disabled={loading}
				>
					{loading ? 'Creating your account!' : 'Register'}
				</button>
			</form>
			<div className='login-link'>
				Already have an account? <Link to='/login'> Log in Here</Link>
			</div>
		</div>
	);
};
