import { Link } from 'react-router-dom';
import { PasswordField } from '../components/loginComponents/PasswordField';
import { UsernameField } from '../components/loginComponents/UsernameField';
import './Register.css';

export const Login = () => {
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			// const response = await axios.post()
		} catch (error) {}
	};
	return (
		<div className='login-container'>
			<h1>Log in</h1>
			<form onSubmit={handleSubmit}>
				<UsernameField />
				<PasswordField />
				<button type='submit'>Log in</button>
			</form>
			<div className='register-link'>
				Don't have an account? <Link to='/register'> Register Here</Link>
			</div>
		</div>
	);
};
