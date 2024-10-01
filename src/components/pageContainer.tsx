import "./pageContainer.css";

const PageContainer: React.FC = () => {
	return (
		<div className="page-container">
			<a className="cat-login" href="/login">Cat Login</a>
			<a className="book-catalogue" href="/book-catalogue">Book Catalogue</a>
			<a className="cattastic-stories" href="/favorites">Cattastic stories</a>
			<a className="purrsonal-space" href="/personal-page">Purrsonal Space</a>
		</div>
	);
};

export default PageContainer;