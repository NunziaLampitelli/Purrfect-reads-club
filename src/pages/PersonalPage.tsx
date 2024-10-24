import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../userContext";
import pageLoadSound from "../assets/kitten meow.mp3";
import CatIconProfile from "../assets/extended_agustus_2_02.jpg";
import "./css/PersonalPage.css";

function PersonalPage() {
	const navigate = useNavigate();
	const { username, setUsername } = useUser();

	// Sound when the page loads 
	useEffect(() => {
		const audio = new Audio(pageLoadSound);
		audio.play();

		const stopSound = setTimeout(() => {
			audio.pause();
			audio.currentTime = 0; 
		}, 1000); 


		return () => {
			clearTimeout(stopSound);
			audio.pause(); 
		};
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("currentUser");
		setUsername(null); 
		navigate("/login"); 
	};

return (
  <div className="personal-page-container">
    <div className="profile-info">
      <img className="cat-profile-pic" src={CatIconProfile} alt="Your Image" />
      <h1>Hey {username}, what would you like to do meow?</h1>
    </div>
    <nav>
      <ul className="button-list">
        <li>
          <Link to="/book-diary">
            <button className="read-books-button">Review a book</button>
          </Link>
        </li>
        <li>
          <Link to="/personal-notes">
          <button className="personal-notes-button">Reviews Diary</button></Link>
        </li>
        <li>
          <Link to="/delete-account">
            <button className="delete-button">Delete account</button>
          </Link>
        </li>
      </ul>
    </nav>
    <button className="log-out-button" onClick={handleLogout}>Logout</button>
  </div>
);
}
export default PersonalPage;
