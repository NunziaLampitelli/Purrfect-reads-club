import "./css/homepage.css";
import logoCat from "../assets/cat-logo.png";
import { Link } from "react-router-dom";

function Homepage() {
	return (
		<div className="homepage-container">
			<p className="homepage-title"> Welcome to Purrfect Reads Club! </p>
			<img src={logoCat} alt="Cute Cat" className="cat-image" />
			<p className="homepage-start">
				This project was created for book and cat lovers.
			</p>
			<p className="homepage-info">
				With the integration of the Google Books API, you can search for books
				and explore informations about them. <br />
				By creating an account, you can also be able to:
			</p>
			<ul className="homepage-list">
				<li className="homepage-list-item">
					Add your favorite books to a personal collection.
				</li>
				<li className="homepage-list-item">
					Write impressions and thoughts about the books you have read
				</li>
				<li className="homepage-list-item">
					Share book links if you want someone else to read them
				</li>
			</ul>
			<p className="homepage-end">
				This is a cozy place where you can start discovering and exploring new
				stories, maybe while cuddling your favorite feline friend!
			</p>

			<div className="homepage-button-container">
				<Link to="/register" className="homepage-button">
					Sign up right meow!
				</Link>
				<Link to="/book-catalogue" className="homepage-button">
					Start book hunt!
				</Link>
			</div>
		</div>
	);
}

export default Homepage;
