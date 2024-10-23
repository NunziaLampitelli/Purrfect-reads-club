import { useEffect, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import IBook from "../interfaces/IBook";
import { useSearch } from "../searchContext";
import "./css/BookCatalogue.css";
import searchIcon from "../assets/login-paw.png"
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";

function BookCatalogue() {
	const { searchItem, setSearchItem, currentPage, setCurrentPage } =
		useSearch();
	const [books, setBooks] = useState<IBook[]>([]);
	const [totalItems, setTotalItems] = useState(0);
	const itemsPerPage = 8;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	useEffect(() => {
		const fetchBooks = async () => {
			if (searchItem) {
				const apiKey = "AIzaSyBgXLpVU0ypFCl4qpu_bLMMeGXjBLLDiqc";
				const startIndex = (currentPage - 1) * itemsPerPage;
				const maxResults = 40;

				const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
					searchItem
				)}&key=${apiKey}&maxResults=${maxResults}&startIndex=${startIndex}`;
				try {
					const response = await fetch(url);
					if (!response.ok) {
						console.error(`Error: ${response.status} - ${response.statusText}`);
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					const data = await response.json();

					if (!data.items) {
						console.error("No items found in the response");
					}

					console.log("Fetched books:", data.items); //to debug if the function gets the data
					setBooks(data.items || []);
					setTotalItems(data.totalItems > 40 ? 40 : data.totalItems);
				} catch (error) {
					console.error(`There was an error in the search:`, error);
				}
			}
		};

		fetchBooks();
	}, [searchItem, currentPage]); // new fetch when searchitem or current page changes

	const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (searchItem.trim() !== "") {
			setCurrentPage(1); // with the new search it redirects to page n.1
		}
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

	return (
		<div className="book-search">
			<div className="search-container">
				<div className="search-info">
					<p className="catalogue-title">Pawfect Book Hunt</p>
					<form className="search-field" onSubmit={handleSearch}>
						<input
							type="text"
							placeholder="Write book info here"
							value={searchItem}
							onChange={(event) => setSearchItem(event.target.value)} // Updates the value of searchItem
						/>
						{totalItems > 0 && (
							<p className="found-books">{`Found ${totalItems} books. Page ${currentPage} of ${totalPages}`}</p>
						)}
					</form>
				</div>
				<button className="search-button" type="submit">
					<img src={searchIcon} alt="search-icon" />
				</button>
			</div>
			<div className="book-list">
				{books.length > 0 ? (
					<>
						<ul className="grid-container">
							{books.slice(0, itemsPerPage).map((book) => (
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
						<div className="pagination">
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
					</>
				) : (
					<p className="no-found-book">No books found</p>
				)}
			</div>
		</div>
	);
}

export default BookCatalogue;
