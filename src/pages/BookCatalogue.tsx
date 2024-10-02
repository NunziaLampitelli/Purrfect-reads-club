import React, { useState } from 'react';
import Header from '../components/header';
import PageContainer from '../components/pageContainer';
import IBook from '../interfaces/IBook'


const BookCatalogue: React.FC = () => {
	const [searchItem, setSearchItem] = useState("");
	const [books, setBooks] = useState<IBook[]>([]); //this is to make sure that the results when updating follow the interface structure 

	const handleSearch = async (event: React.FormEvent) => {
		event.preventDefault();
		const apiKey = "AIzaSyBgXLpVU0ypFCl4qpu_bLMMeGXjBLLDiqc";
		const url = `https://www.googleapis.com/books/v1/volumes?q=${searchItem}&key=${apiKey}`;

		try {
			const response = await fetch(url);
			const data = await response.json();
			setBooks(data.items || []);
		} catch (error) {
			console.error(`There was an error in the serach`);
		}
	};

	return (
		<div className="book-search">
			<Header />
			<PageContainer />
			<form onSubmit={handleSearch}>
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
	);
};



export default BookCatalogue;