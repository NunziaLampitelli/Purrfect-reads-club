import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IBook from "../interfaces/IBook";

function BookInfoPage() {
	const { id } = useParams<{ id: string }>(); // it recovers the id of the book
	const [book, setBook] = useState<IBook | null>(null);

	useEffect(() => {
		const fetchBookDetails = async () => {
			const apiKey = "AIzaSyBgXLpVU0ypFCl4qpu_bLMMeGXjBLLDiqc";
			const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`;

			try {
				const response = await fetch(url);
				const data = await response.json();
				setBook(data);
			} catch (error) {
				console.error("Error fetching book details:", error);
			}
		};

		if (id) {
			fetchBookDetails();
		}
	}, [id]);

	if (!book) {
		return <p>Loading...</p>;
	}

	const { title, authors, description, pageCount, categories, imageLinks } =
		book.volumeInfo;

	return (
		<div>
			<h1>{title}</h1>
			{imageLinks?.thumbnail && (
				<img src={imageLinks.thumbnail} alt={`${title} thumbnail`} />
			)}
			<p>
				<strong>Authors:</strong> {authors?.join(", ")}
			</p>
			<p>
				<strong>Description:</strong>{" "}
				{description || "No description available"}
			</p>
			<p>
				<strong>Pages:</strong> {pageCount}
			</p>
			<p>
				<strong>Genre:</strong> {categories?.join(", ") || "No genre available"}
			</p>
		</div>
	);
}

export default BookInfoPage;
