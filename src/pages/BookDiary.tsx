import { useState, useEffect } from "react";
import "./css/BookDiary.css";

interface Review {
	bookId: string;
	note: string;
	rating: number;
	thumbnail: string; 
}

interface Book {
	id: string;
	title: string;
	authors: string[];
	thumbnail: string;
}

function BookDiary() {
	const [bookReviews, setBookReviews] = useState<Review[]>([]); 
	const [newNote, setNewNote] = useState("");
	const [newRating, setNewRating] = useState(0); 
	const [selectedBook, setSelectedBook] = useState<Book | null>(null); 
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<Book[]>([]); 

	// Retrieve saved reviews from localStorage
	useEffect(() => {
		const savedReviews = JSON.parse(
			localStorage.getItem("book-reviews") || "[]"
		);
		setBookReviews(savedReviews);
	}, []);

	const saveReview = () => {
		if (selectedBook) {
			// saves a selected book
			const updatedReviews = [
				...bookReviews.filter((review) => review.bookId !== selectedBook.id),
				{
					bookId: selectedBook.id,
					note: newNote,
					rating: newRating,
					thumbnail: selectedBook.thumbnail,
				},
			];
			setBookReviews(updatedReviews);
			localStorage.setItem("book-reviews", JSON.stringify(updatedReviews));
			setNewNote("");
			setNewRating(0);
			setSelectedBook(null); // Clear selected book 
		}
	};

	// Delete a review 
	const deleteReview = (bookId: string) => {
		const updatedReviews = bookReviews.filter(
			(review) => review.bookId !== bookId
		);
		setBookReviews(updatedReviews);
		localStorage.setItem("book-reviews", JSON.stringify(updatedReviews));
	};

	// Fetch books based on search query
	const fetchBooks = async (query: string) => {
		if (query.length > 2) {
			const response = await fetch(
				`https://www.googleapis.com/books/v1/volumes?q=${query}`
			);
			const data = await response.json();
			const books = data.items.map((item: any) => ({
				id: item.id,
				title: item.volumeInfo.title,
				authors: item.volumeInfo.authors || [],
				thumbnail: item.volumeInfo.imageLinks?.thumbnail || "", 
			}));
			setSearchResults(books);
		} else {
			setSearchResults([]);
		}
	};

	// starts book search when searchTerm changes
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			fetchBooks(searchTerm);
		}, 500); 
		return () => clearTimeout(timeoutId);
	}, [searchTerm]);

	return (
		<div>
			<h1>Your Book Diary</h1>

			<div>
				<h3>Add or Edit a Review</h3>
				<label>Select a book (ID or title):</label>
				<input
					type="text"
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							fetchBooks(searchTerm); // start the search
						}
					}}
					placeholder="Enter book ID or title"
				/>

				{searchResults.length > 0 && (
					<ul className="search-results">
						{searchResults.map((book) => (
							<li
								key={book.id}
								className="search-item"
								onClick={() => {
									setSelectedBook(book);
									setSearchTerm(book.title);
									setSearchResults([]);
								}}
							>
								<strong>{book.title}</strong> - {book.authors.join(", ")}
							</li>
						))}
					</ul>
				)}

				{selectedBook && (
					<div>
						<h4>Selected Book</h4>
						<p>
							<strong>Title:</strong> {selectedBook.title}
						</p>
						<img
							src={selectedBook.thumbnail}
							alt={selectedBook.title}
							className="book-thumbnail"
						/>
					</div>
				)}

				<label>Personal Notes:</label>
				<textarea
					value={newNote}
					onChange={(event) => setNewNote(event.target.value)}
					placeholder="Write your thoughts on the book"
				/>

				<label>Rating:</label>
				<div className="rating">
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

				<button onClick={saveReview} disabled={!selectedBook}>
					Save Review
				</button>
			</div>

			<div>
				<h3>Your Saved Reviews</h3>
				<ul>
					{bookReviews.length > 0 ? (
						bookReviews.map((review) => (
							<li key={review.bookId}>
								<p>
									<strong>Book ID:</strong> {review.bookId}
								</p>
								<img
									src={review.thumbnail}
									alt="Book cover"
									className="book-thumbnail"
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
								<button onClick={() => deleteReview(review.bookId)}>
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
