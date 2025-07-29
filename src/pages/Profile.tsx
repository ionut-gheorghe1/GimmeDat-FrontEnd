import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type userType = {
	id: number | null;
	username: string | null;
	email: string | null;
};

export const Profile = () => {
	const [user, setUser] = useState<userType>({
		id: null,
		username: null,
		email: null
	});
	const navigate = useNavigate();

	const refreshAccess = async (error: AxiosError) => {
		if (error.status === 401) {
			try {
				const refreshSuccessful = await axios.get(
					'http://localhost:3000/api/users/refresh'
				);
			} catch (error) {
				if (error instanceof AxiosError) {
					console.error(error, '333');
					navigate('/login');
				}
			}
		}
	};

	const fetchUserData = async () => {
		try {
			const response = await axios.get(
				'http://localhost:3000/api/users/profile'
			);
			setUser(response.data);
		} catch (error) {
			if (error instanceof AxiosError) {
				refreshAccess(error);
			}
		}
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	return (
		<>
			<div>ProfilePage</div>
			<div>{user.email}</div>
			<div>{user.id}</div>
			<div>{user.username}</div>
		</>
	);

	interface Profile {
		name: string;
		email: string;
		phone: string;
		address: string;
	}

	const [profile, setProfile] = useState<Profile>({
		name: '',
		email: '',
		phone: '',
		address: ''
	});
	const [activeTab, setActiveTab] = useState<string>('info');
	const [editMode, setEditMode] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProfile({ ...profile, [name]: value });
	};

	const tabStyle = (tab: string) => ({
		padding: '0.75rem 1.5rem',
		borderRadius: '10px',
		border: activeTab === tab ? '2px solid #1d4ed8' : '1px solid #ccc',
		backgroundColor: activeTab === tab ? '#e0e7ff' : '#f9fafb',
		cursor: 'pointer',
		fontWeight: 600,
		fontSize: '1rem',
		transition: 'all 0.3s ease'
	});

	const sectionStyle = {
		marginTop: '2rem',
		border: '1px solid #e5e7eb',
		padding: '2rem',
		borderRadius: '12px',
		backgroundColor: '#ffffff',
		boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)'
	};

	const labelStyle = {
		display: 'block',
		fontWeight: 600,
		marginBottom: '0.5rem',
		color: '#1f2937'
	};

	const inputStyle = {
		padding: '0.75rem 1rem',
		border: '1px solid #d1d5db',
		borderRadius: '8px',
		marginBottom: '1.25rem',
		width: '100%',
		fontSize: '1rem',
		backgroundColor: '#f9fafb'
	};

	return (
		<div
			style={{
				maxWidth: '960px',
				margin: '0 auto',
				padding: '3rem 1.5rem',
				fontFamily: "'Inter', sans-serif",
				backgroundColor: '#f3f4f6'
			}}
		>
			<h1
				style={{
					fontSize: '2.75rem',
					fontWeight: 700,
					marginBottom: '2rem',
					color: '#111827'
				}}
			>
				Account Settings
			</h1>

			<div
				style={{
					display: 'flex',
					gap: '1.5rem',
					alignItems: 'center',
					...sectionStyle
				}}
			>
				<div
					style={{
						width: '90px',
						height: '90px',
						backgroundColor: '#d1d5db',
						borderRadius: '50%'
					}}
				></div>
				<div>
					<h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
						{profile.name}
					</h2>
					<p style={{ color: '#6b7280', margin: '0.4rem 0' }}>
						{profile.email}
					</p>
					<button
						onClick={() => setEditMode(!editMode)}
						style={{
							marginTop: '0.6rem',
							padding: '0.5rem 1.25rem',
							borderRadius: '6px',
							backgroundColor: '#1d4ed8',
							color: '#ffffff',
							border: 'none',
							cursor: 'pointer',
							fontWeight: 500
						}}
					>
						{editMode ? 'Cancel' : 'Edit Profile'}
					</button>
				</div>
			</div>

			<div style={{ display: 'flex', marginTop: '2rem', gap: '1rem' }}>
				<button onClick={() => setActiveTab('info')} style={tabStyle('info')}>
					Profile Info
				</button>
				<button
					onClick={() => setActiveTab('orders')}
					style={tabStyle('orders')}
				>
					Orders
				</button>
				<button
					onClick={() => setActiveTab('wishlist')}
					style={tabStyle('wishlist')}
				>
					Wishlist
				</button>
			</div>

			{activeTab === 'info' && (
				<div style={sectionStyle}>
					{editMode ? (
						<form style={{ display: 'grid', gap: '1rem' }}>
							<div>
								<label style={labelStyle}>Full Name</label>
								<input
									name='name'
									value={profile.name}
									onChange={handleChange}
									style={inputStyle}
								/>
							</div>
							<div>
								<label style={labelStyle}>Email</label>
								<input
									name='email'
									value={profile.email}
									onChange={handleChange}
									style={inputStyle}
								/>
							</div>
							<div>
								<label style={labelStyle}>Phone</label>
								<input
									name='phone'
									value={profile.phone}
									onChange={handleChange}
									style={inputStyle}
								/>
							</div>
							<div>
								<label style={labelStyle}>Address</label>
								<input
									name='address'
									value={profile.address}
									onChange={handleChange}
									style={inputStyle}
								/>
							</div>
							<button
								type='button'
								onClick={() => setEditMode(false)}
								style={{
									padding: '0.75rem 1.5rem',
									backgroundColor: '#10b981',
									color: '#ffffff',
									border: 'none',
									borderRadius: '6px',
									cursor: 'pointer',
									fontWeight: 600
								}}
							>
								Save Changes
							</button>
						</form>
					) : (
						<ul
							style={{ lineHeight: '2', fontSize: '1.05rem', color: '#1f2937' }}
						>
							<li>
								<strong>Name:</strong> {profile.name}
							</li>
							<li>
								<strong>Email:</strong> {profile.email}
							</li>
							<li>
								<strong>Phone:</strong> {profile.phone}
							</li>
							<li>
								<strong>Address:</strong> {profile.address}
							</li>
						</ul>
					)}
				</div>
			)}

			{activeTab === 'orders' && (
				<div style={sectionStyle}>
					<p style={{ color: '#6b7280', fontSize: '1.05rem' }}>
						You have no recent orders.
					</p>
				</div>
			)}

			{activeTab === 'wishlist' && (
				<div style={sectionStyle}>
					<p style={{ color: '#6b7280', fontSize: '1.05rem' }}>
						Your wishlist is empty.
					</p>
				</div>
			)}
		</div>
	);
};
