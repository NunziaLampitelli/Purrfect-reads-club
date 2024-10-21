import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IBook from "../interfaces/IBook";
import "./css/BookInfoPage.css";

function BookInfoPage() {
	const { id } = useParams<{ id: string }>(); 
	const [book, setBook] = useState<IBook | null>(null);
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		const fetchBookDetails = async () => {
			const apiKey = "AIzaSyBgXLpVU0ypFCl4qpu_bLMMeGXjBLLDiqc";
			const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`;

			try {
				const response = await fetch(url);
				const data = await response.json();
				if (data && data.volumeInfo) {
					setBook(data);
					checkIfFavorite(data);
				} else {
					console.error("Book data not found:", data);
				}
			} catch (error) {
				console.error("Error fetching book details:", error);
			}
		};

		if (id) {
			fetchBookDetails();
		}
	}, [id]);

	const checkIfFavorite = (bookData: IBook) => {
		const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
		const isFav = favorites.some(
			(favorite: IBook) => favorite.id === bookData.id
		);
		setIsFavorite(isFav);
	};

	const toggleFavorite = () => {
		if (!book) return; // this is to check that the book isn't null

		const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

		if (isFavorite) {
			const updatedFavorites = favorites.filter(
				(favorite: IBook) => favorite.id !== book.id
			);
			localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
			setIsFavorite(false);
		} else {
			favorites.push(book);
			localStorage.setItem("favorites", JSON.stringify(favorites));
			setIsFavorite(true);
		}
	};

	if (!book) {
		return <p>Loading...</p>; // shows a message if book is null
	}

	const { title, authors, description, pageCount, categories, imageLinks } =
		book.volumeInfo;

	return (
		<div className="book-info-page-container">
			<img
				className="book-info-img"
				src={imageLinks?.thumbnail}
				alt={`${title} thumbnail`}
			/>
			<div className="book-info-content">
				<h1>{title}</h1>
				<p>
					<strong>Authors:</strong> {authors?.join(", ") || "Unknown"}
				</p>
				<p>
					<strong>Description:</strong>{" "}
					{description || "No description available"}
				</p>
				<p>
					<strong>Pages:</strong> {pageCount || "Not specified"}
				</p>
				<p>
					<strong>Genre:</strong>{" "}
					{categories?.join(", ") || "No genre available"}
				</p>
				<button onClick={toggleFavorite}>
					{isFavorite ? "Remove from Favorites" : "Add to Favorites"}
				</button>
			</div>
		</div>
	);
}

export default BookInfoPage;
