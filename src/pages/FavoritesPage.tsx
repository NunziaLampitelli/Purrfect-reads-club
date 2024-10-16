import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IBook from "../interfaces/IBook";

function FavoritesPage() {
	const [favorites, setFavorites] = useState<IBook[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const storedFavorites = JSON.parse(
			localStorage.getItem("favorites") || "[]"
		);
		setFavorites(storedFavorites);
	}, []);

	const handleBookClick = (bookId: string) => {
		navigate(`/book/${bookId}`); // 
	};

	if (favorites.length === 0) {
		return <p>No favorite books found.</p>;
	}

	return (
		<div>
			<h1>Favorite Books</h1>
			<div className="grid-container">
				{favorites.map((book) => (
					<div
						key={book.id}
						className="grid-item"
						onClick={() => handleBookClick(book.id)}
					>
						{book.volumeInfo.imageLinks?.thumbnail && (
							<img
								src={book.volumeInfo.imageLinks.thumbnail}
								alt={`${book.volumeInfo.title} thumbnail`}
							/>
						)}
						<h5>{book.volumeInfo.title}</h5>
						<p>
							<strong>Authors:</strong> {book.volumeInfo.authors?.join(", ")}
						</p>
						<p>
							<strong>Pages:</strong> {book.volumeInfo.pageCount}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default FavoritesPage;
