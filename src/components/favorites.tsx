import IBook from "../interfaces/IBook";

export function checkIfFavorite(bookId: string): boolean {
	const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
	return favorites.some((favorite: IBook) => favorite.id === bookId);
}

export function addFavorite(book: IBook): void {
	const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
	favorites.push(book);
	localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function removeFavorite(bookId: string): void {
	const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
	const updatedFavorites = favorites.filter(
		(favorite: IBook) => favorite.id !== bookId
	);
	localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
}
