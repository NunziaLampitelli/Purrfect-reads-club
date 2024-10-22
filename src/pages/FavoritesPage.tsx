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
		console.log("Stored favorites:", storedFavorites); // I was having issues with the page so I needed to check with a debug 
		setFavorites(storedFavorites);
	}, []);

	const handleBookClick = (bookId: string) => {
		navigate(`/book/${bookId}`);
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
						{book.volumeInfo?.imageLinks?.thumbnail ? (
							<img
								src={book.volumeInfo.imageLinks.thumbnail}
								alt={`${book.volumeInfo.title} thumbnail`}
							/>
						) : (
							<p>No image available</p>
						)}
						<h5>{book.volumeInfo?.title || "No title available"}</h5>
						<p>
							<strong>Authors:</strong>{" "}
							{book.volumeInfo?.authors?.join(", ") || "Unknown authors"}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default FavoritesPage;
