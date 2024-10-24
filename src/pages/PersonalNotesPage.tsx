import { useEffect, useState } from "react";
import IReview from "../interfaces/IReview";
import IBook from "../interfaces/IBook";
import "./css/PersonalNotesPage.css";
function PersonalNotesPage() {
	const [bookReviews, setBookReviews] = useState<IReview[]>([]);
	const [editNote, setEditNote] = useState("");
	const [dropdownOpen, setDropdownOpen] = useState<string | null>(null); // dropdown const 

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

		const removedReview = bookReviews.find(
			(review) => review.bookId === bookId
		);
		if (removedReview && removedReview.rating === 5) {
			const storedFavorites = JSON.parse(
				localStorage.getItem("favorites") || "[]"
			);
			const updatedFavorites = storedFavorites.filter(
				(favorite: IBook) => favorite.id !== bookId
			);
			localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
		}

		setDropdownOpen(null); // closes dropdown when deleted
	};

	const handleEditReview = (bookId: string) => {
		const reviewToEdit = bookReviews.find((review) => review.bookId === bookId);
		if (reviewToEdit) {
			setEditNote(reviewToEdit.note);
			setDropdownOpen(bookId); // opens dropdown for the one selected
		}
	};

	const saveEditedReview = (bookId: string) => {
		const updatedReviews = bookReviews.map((review) =>
			review.bookId === bookId ? { ...review, note: editNote } : review
		);
		setBookReviews(updatedReviews);
		localStorage.setItem("book-reviews", JSON.stringify(updatedReviews));
		setDropdownOpen(null); // close the dropdown after
		setEditNote(""); // to reset
	};

return (
	<div className="personal-notes-container">
		<p className="personal-notes-title">Pawsonal Reviews Diary </p>
		{bookReviews.length === 0 ? (
			<p>No reviews found.</p>
		) : (
			<ul className="personal-notes-list">
				{bookReviews.map((review) => (
					<li key={review.bookId} className="personal-notes-item">
						<div className="personal-notes-content">
							<img
								src={review.thumbnail}
								alt="Book thumbnail"
								className="personal-notes-thumbnail"
							/>
							<div className="personal-notes-info">
								<h4 onClick={() => handleEditReview(review.bookId)}>
									{review.note}
								</h4>
								<p>Rating: {review.rating}</p>
								<button
									className="action-button"
									onClick={() =>
										setDropdownOpen(
											dropdownOpen === review.bookId ? null : review.bookId
										)
									}
								>
									Actions
								</button>
								{dropdownOpen === review.bookId && (
	<div className="review-actions">
		<textarea
			value={editNote}
			onChange={(e) => setEditNote(e.target.value)}
			placeholder="Edit your note..."
			className="edit-textarea"
			rows={4} 
		/>
		<button
			className="save-button"
			onClick={() => saveEditedReview(review.bookId)}
		>
			Save
		</button>
		<button
			className="delete-review-button"
			onClick={() => handleDeleteReview(review.bookId)}
		>
			Delete
		</button>
	</div>

								)}
							</div>
						</div>
					</li>
				))}
			</ul>
		)}
	</div>
);
}

export default PersonalNotesPage;
