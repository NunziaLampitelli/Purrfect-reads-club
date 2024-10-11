import React, { useState } from 'react';
import IBook from '../interfaces/IBook'
import "./css/BookCatalogue.css";


function BookCatalogue() {
	const [searchItem, setSearchItem] = useState("");
	const [books, setBooks] = useState<IBook[]>([]);

	const handleSearch = async (event: React.FormEvent) => {
		event.preventDefault();
		const apiKey = "AIzaSyBgXLpVU0ypFCl4qpu_bLMMeGXjBLLDiqc"; 
		const url = `https://www.googleapis.com/books/v1/volumes?q=${searchItem}&key=${apiKey}`;

		try {
			const response = await fetch(url);
			const data = await response.json();
			setBooks(data.items || []);
		} catch (error) {
			console.error(`There was an error in the search`);
		}
	};

	return (
					<div className="book-search">
				<form className="search-field" onSubmit={handleSearch}>
					<input
						type="text"	placeholder="Write book info here" value={searchItem} onChange={(event) => setSearchItem(event.target.value)}
					/>
					<button type="submit">Search</button>
				</form>
				<div className='book-list'>
					{books.length > 0 ? (
						<ul className='grid-container'>
							{books.map((book) => (
								<li key={book.id} className='grid-item'>
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