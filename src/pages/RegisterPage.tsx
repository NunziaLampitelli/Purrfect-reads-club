import { useState } from "react";
import IUser from "../interfaces/IUser";
import { Link, useNavigate } from "react-router-dom";
import "./css/RegisterPage.css"
import loginIcon from "../assets/login-paw.png";

function RegisterPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<String | null>(null);

  const navigate = useNavigate();

  function HandleRegister(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (password !== confirmPassword) {
			setErrorMessage(`Passwords do not match. Please retry`);
			return;
		}

		// this is to retreive all the users already saved in the localstorage
		const users = JSON.parse(localStorage.getItem("users") || "[]") as IUser[];

		// this is to check if the username has already been used for another user
		const existingUser = users.find((user) => user.username === username);

		if (existingUser) {
			setErrorMessage(
				"This username is already used. Choose another one please"
			);
			return;
		}

		// this is to create a new user to add in the localstorage arrey
		const newUser: IUser = {
			username: username,
			password: password,
		};

		users.push(newUser);

		// this is to save the new arrey of users
		localStorage.setItem("users", JSON.stringify(users));

		setUsername("");
		setPassword("");
		setConfirmPassword("");
		setErrorMessage(null);

		setTimeout(() => {
			navigate("/login"); 
		}, 1000);
	}

  return (
		<div className="register-container">
			<form className="register-form" onSubmit={HandleRegister}>
				{errorMessage && <p>{errorMessage}</p>}
				<div>
					<label>Choose a meowsername</label>
					<input
						type="text"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
						required
					/>
				</div>
				<div>
					<label>Choose a pawssword</label>
					<input
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						required
					/>
				</div>
				<div>
					<label>Confirm the pawssword</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(event) => setConfirmPassword(event.target.value)}
						required
					/>
				</div>
				<button className="register-button" type="submit">
					<img src={loginIcon} alt="Login Icon" className="icon" />
				</button>
			</form>
			<p>
				If you already have an account click <Link className="register-login-link" to="/login/">here</Link>
			</p>
		</div>
	);
}

export default RegisterPage;