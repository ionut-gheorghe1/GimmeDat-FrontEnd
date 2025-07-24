import { Link, useNavigate } from 'react-router-dom';
import { PasswordField } from '../components/loginComponents/PasswordField';
import { UsernameField } from '../components/loginComponents/UsernameField';
import './Register.css';
import { useState } from 'react';
import type { LoginFormData } from '../components/types';
import axios from 'axios';

export const Login = () => {
	const [loginFormData, setLoginFormData] = useState<LoginFormData>({
		username: '',
		password: ''
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoginFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};
	const navigate = useNavigate();
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await axios.post<{
				success: boolean;
				id: string;
				username: string;
			}>('http://localhost:3000/api/users/login', {
				username: loginFormData.username,
				password: loginFormData.password,
				headers: {
					'Content-Type': 'application/json'
				}
			});
			console.log(response.data);

			navigate('/');
		} catch (error) {
			console.log('eroare handleSubmit', error);
		}
	};
	return (
		<>
			<div className='login-container'>
				<div className='logo'>
					<Link to={'/'} className='logo-link'>
						<h1>E-Shop</h1>
					</Link>
				</div>
				<h1 className='title-h1'>Log in</h1>
				<form onSubmit={handleSubmit} id='login-form'>
					<UsernameField
						name='username'
						value={loginFormData.username}
						onChange={handleChange}
					/>
					<PasswordField
						name='password'
						value={loginFormData.password}
						onChange={handleChange}
					/>
					<button type='submit'>Log in</button>
				</form>
				<div className='register-link-container'>
					Don't have an account?{' '}
					<Link to='/register' className='register-link'>
						{' '}
						Register Here
					</Link>
				</div>
			</div>
		</>
	);
};
