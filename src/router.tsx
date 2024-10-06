import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import BookCatalogue from "./pages/BookCatalogue";
import LoginPage from "./pages/LoginPage";
import FavoritesPage from "./pages/FavoritesPage";
import PageLinks from "./components/PageLinks";
import Header from "./components/header";

function AppRouter() {
	return (
		<Router>
			<Header />
			<PageLinks />
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/book-catalogue" element={<BookCatalogue />} />
				<Route path="/favorites" element={<FavoritesPage />} />
			</Routes>
		</Router>
	);
}

export default AppRouter;
