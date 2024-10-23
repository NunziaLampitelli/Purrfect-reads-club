import { useState, useEffect } from "react";
import "./css/BookDiary.css";
import IBook from "../interfaces/IBook";
import IReview from "../interfaces/IReview";
import { Link } from "react-router-dom";

function BookDiary() {
	const [bookReviews, setBookReviews] = useState<IReview[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<IBook[]>([]);
	const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
	const [note, setNote] = useState<string>("");
	const [rating, setRating] = useState<number>(0);

//to retrevie from local storage
	useEffect(() => {
		const savedReviews = JSON.parse(
			localStorage.getItem("book-reviews") || "[]"
		);
		setBookReviews(savedReviews);
	}, []);

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

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			fetchBooks(searchTerm);
		}, 500);
		return () => clearTimeout(timeoutId);
	}, [searchTerm]);

	const handleSaveReview = () => {
		if (selectedBook && note.trim()) {
			const newReview: IReview = {
				bookId: selectedBook.id,
				note: note,
				rating: rating,
				thumbnail: selectedBook.volumeInfo.imageLinks?.thumbnail || "",
			};

			const updatedReviews = [...bookReviews, newReview];
			setBookReviews(updatedReviews);
			localStorage.setItem("book-reviews", JSON.stringify(updatedReviews));

			if (rating === 5) {
				const storedFavorites = JSON.parse(
					localStorage.getItem("favorites") || "[]"
				);
				if (
					!storedFavorites.some(
						(favorite: IBook) => favorite.id === selectedBook.id
					)
				) {
					storedFavorites.push(selectedBook); 
					localStorage.setItem("favorites", JSON.stringify(storedFavorites));
				}
			}

			setNote("");
			setRating(0);
			setSelectedBook(null);
			setSearchResults([]);
		}
	};

	return (
		<div className="book-diary-container">
			<h1 className="book-diary-title">Your Book Diary</h1>

			<label className="book-diary-label">Search for a book:</label>
			<div className="dropdown-container">
				<input
					className="book-diary-input"
					type="text"
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
					placeholder="Enter book title or author"
				/>

				{searchResults.length > 0 && !selectedBook && (
					<ul className="book-diary-search-results">
						{searchResults.map((book) => (
							<li
								key={book.id}
								className="book-diary-search-item"
								onClick={() => {
									setSelectedBook(book);
									setSearchTerm(book.volumeInfo.title);
									setSearchResults([]);
								}}
							>
								<strong>{book.volumeInfo.title}</strong> -{" "}
								{book.volumeInfo.authors?.join(", ") ?? "Unknown Author"}
							</li>
						))}
					</ul>
				)}
			</div>

			{selectedBook && (
				<div className="book-diary-selected-book">
					<h4 className="book-diary-selected-title">Selected Book</h4>
					<p>
						<strong>Title:</strong> {selectedBook.volumeInfo.title}
					</p>
					<img
						src={selectedBook.volumeInfo.imageLinks?.thumbnail || ""}
						alt={selectedBook.volumeInfo.title}
						className="book-diary-thumbnail"
					/>

					<textarea
						value={note}
						onChange={(e) => setNote(e.target.value)}
						placeholder="Write your note here..."
						className="book-diary-note"
					/>
					<div className="rating-container">
						{[1, 2, 3, 4, 5].map((star) => (
							<span
								key={star}
								className={`star ${rating >= star ? "filled" : ""}`}
								onClick={() => setRating(star)}
							>
								★
							</span>
						))}
					</div>
					<button onClick={handleSaveReview}>Save Review</button>
				</div>
			)}

			<Link to="/personal-notes" className="personal-notes-link">
				Personal Notes
			</Link>
		</div>
	);
}

export default BookDiary;
