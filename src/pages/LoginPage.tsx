import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IUser from "../interfaces/IUser";

function LoginPage() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleLogin = (event: React.FormEvent) => {
		event.preventDefault();

		// Retrieve all users from localStorage
		const users = JSON.parse(localStorage.getItem("users") || "[]") as IUser[];

		// Find the user with the provided username and password
		const user = users.find(
			(user) => user.username === username && user.password === password
		);

		if (user) {
			console.log("Login successful");

			// Save the current user to localStorage
			localStorage.setItem("currentUser", username);

			navigate("/personal-page");
		} else {
			setErrorMessage("Invalid username or password. Please try again.");
		}
	};

	return (
		<div>
			<h2>Login</h2>
			{errorMessage && <p>{errorMessage}</p>}
			<form onSubmit={handleLogin}>
				<div>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						required
					/>
				</div>
				<button type="submit">Login</button>
			</form>
			<Link to="/register">Register</Link>
		</div>
	);
}

export default LoginPage;
