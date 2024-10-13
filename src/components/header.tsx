import "./header.css";
import { Link } from "react-router-dom";
function Header() {
	return (
		<header>
			<h1>
				<Link to="/" className="purrfect-title">Purrfect Reads Club</Link></h1>
		</header>
	);
};

export default Header;