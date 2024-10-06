import { Link } from "react-router-dom";
import "./PageLinkscss.css";

function PageLinks() {
	return (
		<div className="navigation">
			<Link className="cat-login" to="/login">
				Cat Login
			</Link>
			<Link className="book-catalogue" to="/book-catalogue">
				Book Catalogue
			</Link>
			<Link className="cattastic-stories" to="/favorites">
				Cattastic stories
			</Link>
			<Link className="purrsonal-space" to="/personal-page">
				Purrsonal Space
			</Link>
		</div>
	);
}

export default PageLinks;
