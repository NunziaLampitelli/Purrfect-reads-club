import { useEffect, useState } from "react";
import IReview from "../interfaces/IReview";
import IBook from "../interfaces/IBook";

function PersonalNotesPage() {
	const [bookReviews, setBookReviews] = useState<IReview[]>([]);

	useEffect(() => {
		const savedReviews = JSON.parse(
			localStorage.getItem("book-reviews") || "[]"
		);
		setBookReviews(savedReviews);
	}, []);

const handleDeleteReview = (bookId: string) => {
	const updatedReviews = bookReviews.filter(
		(review) => review.bookId !== bookId
	);
	setBookReviews(updatedReviews);
	localStorage.setItem("book-reviews", JSON.stringify(updatedReviews));

	const removedReview = bookReviews.find((review) => review.bookId === bookId);
	if (removedReview && removedReview.rating === 5) {
		const storedFavorites = JSON.parse(
			localStorage.getItem("favorites") || "[]"
		);
		const updatedFavorites = storedFavorites.filter(
			(favorite: IBook) => favorite.id !== bookId
		);
		localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
	}
};

	return (
		<div className="personal-notes-container">
			<h1 className="personal-notes-title">Your Personal Notes</h1>
			{bookReviews.length === 0 ? (
				<p>No reviews found.</p>
			) : (
				<ul className="personal-notes-list">
					{bookReviews.map((review) => (
						<li key={review.bookId} className="personal-notes-item">
							<h4>{review.note}</h4>
							<p>Rating: {review.rating}</p>
							<img
								src={review.thumbnail}
								alt="Book thumbnail"
								className="personal-notes-thumbnail"
							/>
							<button onClick={() => handleDeleteReview(review.bookId)}>
								Delete
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default PersonalNotesPage;
