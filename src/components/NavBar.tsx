import { Link } from 'react-router-dom';
import './NavBar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			const response = await axios.get(
				'http://localhost:3000/api/users/logout',
				{
					withCredentials: true
				}
			);
			console.log(response.data);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<nav>
			<div className='logo'>
				<Link to='/' className='logo-btn'>
					E-Shop
				</Link>
			</div>
			<div className='search-bar'>
				<input type='text' className='search-input' />
				<button className='search-input-btn'>search</button>
			</div>
			<div className='auth'>
				<div className='login'>
					<Link to='/login' className='login-btn'>
						Log in
					</Link>
				</div>
				<div className='register'>
					<Link to='/register' className='register-btn'>
						Register
					</Link>
				</div>
				<div className='cart'>
					<Link to='/cart' className='cart-btn'>
						My Cart
					</Link>
				</div>

				<div className='profile'>
					<Link to='/profile' className='profile-btn'>
						My Profile
					</Link>
				</div>
				<div className='logout'>
					<Link to='/logout' className='logout-btn' onClick={handleLogout}>
						Log out
					</Link>
				</div>
			</div>
		</nav>
	);
};
