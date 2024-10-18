import { Link } from "react-router-dom";

function PersonalPage() {
	return (
		<div>
			<h1>Personal Page</h1>
			<Link to="/book-diary">To read books diary </Link>
			<Link to="/delete-account">Do you want to delete your account?</Link>
		</div>
	);
}

export default PersonalPage;
