import { useState, useEffect } from "react";
import "./css/BookDiary.css";
import IBook from "../interfaces/IBook";
import IReview from "../interfaces/IReview";

function BookDiary() {
	const [bookReviews, setBookReviews] = useState<IReview[]>([]);
	const [newNote, setNewNote] = useState("");
	const [newRating, setNewRating] = useState(0);
	const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<IBook[]>([]);

	// Retrieve saved reviews from localStorage
	useEffect(() => {
		const savedReviews = JSON.parse(
			localStorage.getItem("book-reviews") || "[]"
		);
		setBookReviews(savedReviews);
	}, []);

	const saveReview = () => {
		if (selectedBook) {
			const updatedReviews = [
				...bookReviews.filter((review) => review.bookId !== selectedBook.id),
				{
					bookId: selectedBook.id,
					note: newNote,
					rating: newRating,
					thumbnail:
						selectedBook.thumbnail ||
						selectedBook.volumeInfo.imageLinks?.thumbnail ||
						"",
				},
			];
			setBookReviews(updatedReviews);
			localStorage.setItem("book-reviews", JSON.stringify(updatedReviews));

			if (newRating === 5) {
				const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
				const isFavorite = favorites.some(
					(favorite: IBook) => favorite.id === selectedBook.id
				);

				if (!isFavorite) {
					favorites.push(selectedBook);
					localStorage.setItem("favorites", JSON.stringify(favorites));
				}
			}

			setNewNote("");
			setNewRating(0);
			setSelectedBook(null);
		}
	};

	const deleteReview = (bookId: string) => {
		const updatedReviews = bookReviews.filter(
			(review) => review.bookId !== bookId
		);
		setBookReviews(updatedReviews);
		localStorage.setItem("book-reviews", JSON.stringify(updatedReviews));

		const deletedReview = bookReviews.find(
			(review) => review.bookId === bookId
		);
		if (deletedReview && deletedReview.rating === 5) {
			const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
			const updatedFavorites = favorites.filter(
				(favorite: IBook) => favorite.id !== bookId
			);
			localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
		}
	};

	const fetchBooks = async (query: string) => {
		if (query.length > 2) {
			const response = await fetch(
				`https://www.googleapis.com/books/v1/volumes?q=${query}`
			);
			const data = await response.json();
			const books: IBook[] = data.items.map((item: any) => ({
				id: item.id,
				volumeInfo: {
					title: item.volumeInfo.title,
					authors: item.volumeInfo.authors || [],
					imageLinks: {
						thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
					},
				},
			}));
			setSearchResults(books);
		} else {
			setSearchResults([]);
		}
	};

	// Starts book search when searchTerm changes
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			fetchBooks(searchTerm);
		}, 500);
		return () => clearTimeout(timeoutId);
	}, [searchTerm]);

	return (
		<div className="book-diary-container">
			<h1 className="book-diary-title">Your Book Diary</h1>

			<div className="book-diary-review-section">
				<h3 className="book-diary-subtitle">Add or Edit a Review</h3>
				<label className="book-diary-label">Select a book (ID or title):</label>
				<input
					className="book-diary-input"
					type="text"
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							fetchBooks(searchTerm); // Start the search
						}
					}}
					placeholder="Enter book ID or title"
				/>
				{searchResults.length > 0 &&
					!selectedBook && ( // Show results only if no book is selected
						<ul className="book-diary-search-results">
							{searchResults.map((book) => (
								<li
									key={book.id}
									className="book-diary-search-item"
									onClick={() => {
										setSelectedBook(book);
										setSearchTerm(book.volumeInfo.title);
										setSearchResults([]); // Clear search results
									}}
								>
									<strong>{book.volumeInfo.title}</strong> -{" "}
									{book.volumeInfo.authors?.join(", ") ?? "Unknown Author"}
								</li>
							))}
						</ul>
					)}

				{selectedBook && (
					<div className="book-diary-selected-book">
						<h4 className="book-diary-selected-title">Selected Book</h4>
						<p>
							<strong>Title:</strong> {selectedBook.volumeInfo.title}
						</p>
						<img
							src={
								selectedBook.thumbnail ||
								selectedBook.volumeInfo.imageLinks?.thumbnail
							}
							alt={selectedBook.volumeInfo.title}
							className="book-diary-thumbnail"
						/>
					</div>
				)}

				<label className="book-diary-label">Personal Notes:</label>
				<textarea
					className="book-diary-textarea"
					value={newNote}
					onChange={(event) => setNewNote(event.target.value)}
					placeholder="Write your thoughts on the book"
				/>

				<label className="book-diary-label">Rating:</label>
				<div className="book-diary-rating">
					{[1, 2, 3, 4, 5].map((star) => (
						<button
							key={star}
							onClick={() => setNewRating(star)}
							className={newRating >= star ? "star-gold" : "star-gray"}
						>
							★
						</button>
					))}
				</div>

				<button
					className="book-diary-save-button"
					onClick={saveReview}
					disabled={!selectedBook}
				>
					Save Review
				</button>
			</div>

			<div className="book-diary-reviews-section">
				<h3 className="book-diary-subtitle">Your Saved Reviews</h3>
				<ul className="book-diary-reviews-list">
					{bookReviews.length > 0 ? (
						bookReviews.map((review) => (
							<li key={review.bookId} className="book-diary-review-item">
								<p>
									<strong>Book ID:</strong> {review.bookId}
								</p>
								<img
									src={review.thumbnail}
									alt="Book cover"
									className="book-diary-thumbnail"
								/>
								<p>
									<strong>Notes:</strong> {review.note}
								</p>
								<p>
									<strong>Rating:</strong>{" "}
									{Array.from({ length: review.rating })
										.map(() => "★")
										.join("")}
								</p>
								<button
									className="book-diary-delete-button"
									onClick={() => deleteReview(review.bookId)}
								>
									Delete Review
								</button>
							</li>
						))
					) : (
						<p>No reviews saved yet.</p>
					)}
				</ul>
			</div>
		</div>
	);
}

export default BookDiary;
