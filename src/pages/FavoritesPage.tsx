import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IBook from "../interfaces/IBook";
import "./css/FavoritesPage.css";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";

function FavoritesPage() {
	const [favorites, setFavorites] = useState<IBook[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;
	const totalPages = Math.ceil(favorites.length / itemsPerPage);
	const navigate = useNavigate();

	useEffect(() => {
		const storedFavorites = JSON.parse(
			localStorage.getItem("favorites") || "[]"
		);
		setFavorites(storedFavorites);
	}, []);

	const handleBookClick = (bookId: string) => {
		navigate(`/book/${bookId}`);
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	};

	if (favorites.length === 0) {
		return <p>No favorite books yet.</p>;
	}

	return (
		<div className="favorite-books-page">
			<p className="favorite-page-title">Furvourite Books</p>
			<div className="favorite-book-list">
				<ul className="favorite-grid-container">
					{favorites
						.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
						.map((book) => (
							<li
								key={book.id}
								className="favorite-grid-item"
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
								<p className="favorite-author">
									{book.volumeInfo?.authors?.join(", ") || "Unknown authors"}
								</p>
							</li>
						))}
				</ul>
				{favorites.length > itemsPerPage && ( 
					<div className="favorite-pagination">
						<button onClick={handlePreviousPage} disabled={currentPage === 1}>
							<img src={leftArrow} alt="left-arrow" />
						</button>
						<span>{`Page ${currentPage} of ${totalPages}`}</span>
						<button
							onClick={handleNextPage}
							disabled={currentPage === totalPages}
						>
							<img src={rightArrow} alt="right-arrow" />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default FavoritesPage;
