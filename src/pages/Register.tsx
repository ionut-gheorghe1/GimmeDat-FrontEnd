import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import { PasswordInput } from '../components/registerComponents/PasswordInput';
import { EmailInput } from '../components/registerComponents/EmailInput';
import { UsernameInput } from '../components/registerComponents/UsernameInput';
import { ConfirmPasswordInput } from '../components/registerComponents/ConfirmPasswordInput';
import type { ErrorTypes, RegisterFormData } from '../components/types';
import axios from 'axios';

export const Register = () => {
	const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const [errors, setErrors] = useState<ErrorTypes>({
		username: {
			isValid: true,
			messages: {
				length: null,
				allowedChars: null,
				noSpaces: null,
				noSpecialStartEnd: null
			}
		},
		email: {
			isValid: true,
			messages: {
				format: null,
				domain: null,
				tld: null,
				validChars: null
			}
		},
		password: {
			isValid: true,
			messages: {
				length: null,
				uppercase: null,
				digit: null,
				specialChar: null
			}
		},
		confirmPassword: {
			isValid: true,
			messages: {
				match: null
			}
		}
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setRegisterFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post('http://localhost:3000/api/users', {
				username: registerFormData.username,
				email: registerFormData.email,
				password: registerFormData.password
			});
			console.log('Registration successful :', response.data);
		} catch (error) {
			console.log('Registration failed: ', error);
		}
		setLoading(false);
	};

	return (
		<div className='register-container'>
			<div className='logo'>
				<Link to={'/'} className='logo-link'>
					<h1>E-Shop</h1>
				</Link>
			</div>
			<h1 className='title-h1'>Create your account!</h1>
			<form onSubmit={handleSubmit} id='register-form'>
				<UsernameInput
					name='username'
					value={registerFormData.username}
					onChange={handleChange}
					error={errors.username}
					setError={setErrors}
				/>
				<EmailInput
					name='email'
					value={registerFormData.email}
					onChange={handleChange}
					error={errors.email}
					setError={setErrors}
				/>
				<PasswordInput
					name='password'
					value={registerFormData.password}
					onChange={handleChange}
					error={errors.password}
					setError={setErrors}
				/>
				<ConfirmPasswordInput
					name='confirmPassword'
					value={registerFormData.confirmPassword}
					onChange={handleChange}
					password={registerFormData.password}
					error={errors.confirmPassword}
					setError={setErrors}
				/>

				<button type='submit' name='submit-btn' disabled={loading}>
					{loading ? 'Creating your account!' : 'Register'}
				</button>
			</form>
			<div className='login-link-container'>
				Already have an account?{' '}
				<Link to='/login' className='login-link'>
					{' '}
					Log in Here
				</Link>
			</div>
		</div>
	);
};
