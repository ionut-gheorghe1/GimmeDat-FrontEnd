import { Link } from 'react-router-dom';

export const NavBar = () => {
	return (
		<nav>
			<div className='logo'>
				<Link to='/'>GimmeDat</Link>
			</div>
			<div className='auth'>
				<div className='login'>
					<Link to='/login'>Log in</Link>
				</div>
				<div className='register'>
					<Link to='/register'>Register</Link>
				</div>
			</div>
		</nav>
	);
};
