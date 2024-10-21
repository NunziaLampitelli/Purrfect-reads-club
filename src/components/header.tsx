import "./header.css";
import { Link } from "react-router-dom";
import logoIcon from "../assets/cat-logo.png";
function Header() {
	return (
		<header>
				<Link to="/" className="purrfect-title">Purrfect Reads Club</Link>
				<img src={logoIcon} alt="logo-icon" className="header-logo" />
		</header>
	);
};

export default Header;