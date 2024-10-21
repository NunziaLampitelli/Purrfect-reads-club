import { useEffect, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import IBook from "../interfaces/IBook";
import { useSearch } from "../searchContext"; 
import "./css/BookCatalogue.css";

function BookCatalogue() {
	const { searchItem, setSearchItem } = useSearch(); 
	const [books, setBooks] = useState<IBook[]>([]);

	useEffect(() => {
		const fetchBooks = async () => {
			if (searchItem) {
				const apiKey = "AIzaSyBgXLpVU0ypFCl4qpu_bLMMeGXjBLLDiqc"; 
				const url = `https://www.googleapis.com/books/v1/volumes?q=${searchItem}&key=${apiKey}`;

				try {
					const response = await fetch(url);
					const data = await response.json();
					console.log("Fetched books:", data.items); 
					setBooks(data.items || []);
				} catch (error) {
					console.error(`There was an error in the search:`, error);
				}
			}
		};

		fetchBooks(); 
	}, [searchItem]); 

	const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Non è più necessario fare la chiamata API qui
	};

	return (
		<div className="book-search">
			<form className="search-field" onSubmit={handleSearch}>
				<input
					type="text"
					placeholder="Write book info here"
					value={searchItem}
					onChange={(event) => setSearchItem(event.target.value)}
				/>
				<button type="submit">Search</button>
			</form>
			<div className="book-list">
				{books.length > 0 ? (
					<ul className="grid-container">
						{books.map((book) => (
							<li key={book.id} className="grid-item">
								<Link to={`/book/${book.id}`}>
									{book.volumeInfo.imageLinks?.thumbnail ? (
										<img
											src={book.volumeInfo.imageLinks.thumbnail}
											alt={`${book.volumeInfo.title} thumbnail`}
										/>
									) : (
										<p>No image available</p>
									)}
									<h5>{book.volumeInfo.title}</h5>
									<p>{book.volumeInfo.authors?.join(", ")}</p>
								</Link>
							</li>
						))}
					</ul>
				) : (
					<p>No books found</p>
				)}
			</div>
		</div>
	);
}

export default BookCatalogue;
