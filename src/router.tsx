import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import BookCatalogue from "./pages/BookCatalogue";
import LoginPage from "./pages/LoginPage";
import FavoritesPage from "./pages/FavoritesPage";
import PageLinks from "./components/PageLinks";
import Header from "./components/header";
import PageContainer from "./components/pageContainer";
import PersonalPage from "./pages/PersonalPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import RegisterPage from "./pages/RegisterPage";
import BookInfoPage from "./pages/BookInfoPage";
import BookDiary from "./pages/BookDiary";

function AppRouter() {
	return (
		<Router>
			<Header />
			<PageLinks />
			<Routes>
				{/* this is to have the content of every page inside the pagecontainer */}
				<Route path="/" element={<PageContainer />}>
					<Route index element={<Homepage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="register" element={<RegisterPage />} />
					<Route path="book-catalogue" element={<BookCatalogue />} />
					<Route path="/book/:id" element={<BookInfoPage />} /> {/* here it uses the id of the book to catch the data and open the page*/}
					<Route path="favorites" element={<FavoritesPage />} />
					<Route path="personal-page" element={<PersonalPage />} />
					<Route path= "book-diary" element={<BookDiary />} />
					<Route path="delete-account" element={<DeleteAccountPage />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default AppRouter;
