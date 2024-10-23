import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importa Link qui
import "./css/DeleteAccountpage.css";

function DeleteAccountPage() {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const navigate = useNavigate();

	function handleDeleteAccount() {
		const users = JSON.parse(localStorage.getItem("users") || "[]");
		const currentUsername = localStorage.getItem("currentUser");

		if (!currentUsername) {
			setErrorMessage("No user is currently logged in.");
			return;
		}

		const updatedUsers = users.filter(
			(user: any) => user.username !== currentUsername
		);
		localStorage.setItem("users", JSON.stringify(updatedUsers));
		localStorage.removeItem("currentUser");

		navigate("/login");
	}

	return (
		<div className="delete-account-container">
			<p className="delete-title">Delete Account</p>
			{errorMessage && <p className="error-message">{errorMessage}</p>}
			<p className="delete-warning">
				If you press the button all your data will be lost and all the cats will
				become sad.
				<br />
				Are you sure you want to delete your account?
			</p>
			<Link to="/personal-page">
				<button className="back-link">Back to happy cats</button>
			</Link>
			<button className="logout-button" onClick={handleDeleteAccount}>
				Delete my account
			</button>
		</div>
	);
}

export default DeleteAccountPage;
