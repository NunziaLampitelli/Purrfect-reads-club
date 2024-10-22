import "./css/NotFoundPage.css";
import { Link } from 'react-router-dom';

function NotFoundPage() {
	return (
		<div className="not-found-container">
			<h1 className="not-found-title">Cat-astrophe! - Page Meowt Of Place </h1>
			<p>Sorry, we couldn't find any books or cats in this page.</p>
			<p>Back to homepage <Link className="homepage-link" to="/">here</Link></p>
		</div>
	);
}

export default NotFoundPage;
