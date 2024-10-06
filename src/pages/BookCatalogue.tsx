import React, { useState } from 'react';
import IBook from '../interfaces/IBook'
import PageContainer from '../components/pageContainer';


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
		<PageContainer>
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
				<div>
					{books.length > 0 ? (
						<ul>
							{books.map((book) => (
								<li key={book.id}>
									{book.volumeInfo.imageLinks?.thumbnail ? (
										<img
											src={book.volumeInfo.imageLinks.thumbnail}
											alt={`${book.volumeInfo.title} thumbnail`}
										/>
									) : (
										<p>No image available</p>
									)}
									<h2>{book.volumeInfo.title}</h2>
									<p>{book.volumeInfo.authors?.join(", ")}</p>
								</li>
							))}
						</ul>
					) : (
						<p>No books found</p>
					)}
				</div>
			</div>
		</PageContainer>
	);
}

export default BookCatalogue;