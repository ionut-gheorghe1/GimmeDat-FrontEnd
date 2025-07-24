import axios, { AxiosError } from 'axios';
import { useState } from 'react';

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

	const fetchUserData = async () => {
		try {
			const response = await axios.get(
				'http://localhost:3000/api/users/profile'
			);
			console.log(response.data);
		} catch (error) {
			if (error instanceof Error) {
				console.error(error);
			}
		}
	};
	fetchUserData();

	return (
		<>
			<div>ProfilePage</div>
			{user?.username}
		</>
	);
};
