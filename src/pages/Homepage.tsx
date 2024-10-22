import "./css/homepage.css"
function Homepage() {
	return (
		<div className="homepage-container">
			<h1> Welcome to Purrfect Reads Club!</h1>
			<p>
				This project was created for book and cat lovers. 
				With the integration of the Google Books API, you can search for books and explore informations about them. 
				By creating an account, you can also be able to: </p>
				<ul>
					<li>Add your favorite books to a personal collection.</li>
					<li> Write impressions and thoughts about the books you have read</li>
					<li> Share book links if you want someone else to read them</li>
				</ul>
				<p>This is a cozy place where you can start discovering and exploring new stories, maybe while cuddling your favorite feline friend!</p>
		</div>
	);
};

export default Homepage;