import React, { useState } from "react";

function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (event: React.FormEvent) => {
		event.preventDefault();
		console.log("Logging in with:", { username, password });
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default LoginPage;
