import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../userContext"; 
import IUser from "../interfaces/IUser";
import "./css/LoginPage.css";
import loginIcon from "../assets/login-paw.png";

function LoginPage() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const { username: loggedInUsername, setUsername: setContextUsername } =
		useUser();

	const navigate = useNavigate();

function handleLogin(event: React.FormEvent) {
	event.preventDefault();

	const users = JSON.parse(localStorage.getItem("users") || "[]") as IUser[];
	const user = users.find(
		(user) => user.username === username && user.password === password
	);

	if (user) {
		console.log("Login successful");

		localStorage.setItem("currentUser", username);
		setContextUsername(username);

		navigate("/personal-page");
	} else {
		setErrorMessage("Invalid username or password. Please try again.");
	}
}

	return (
		<div className="login-container">
			{errorMessage && <p>{errorMessage}</p>}

			{loggedInUsername ? ( // This is to show the message when the account is already logged in instead of the form
				<div>
					<h2>You are already logged in {loggedInUsername}! Meow!</h2>
				</div>
			) : (
				<form className="login-form" onSubmit={handleLogin}>
					<div>
						<label htmlFor="username">Enter meowsername</label>
						<input
							type="text"
							id="username"
							placeholder="Write your username here"
							value={username}
							onChange={(event) => setUsername(event.target.value)}
							required
						/>
					</div>
					<div>
						<label htmlFor="password">Enter pawssword</label>
						<input
							type="password"
							id="password"
							placeholder="Write your password here"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							required
						/>
					</div>
					<button className="login-button" type="submit">
						<img src={loginIcon} alt="Login Icon" className="icon" />
					</button>
				</form>
			)}

			{!loggedInUsername && ( <p>If you don't have one, you can register a new account <Link to="/register" className="login-register-link">
						here
					</Link>
				</p>
			)}
		</div>
	);
}

export default LoginPage;
