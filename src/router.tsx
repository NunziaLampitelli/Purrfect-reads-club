import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import BookCatalogue from "./pages/BookCatalogue";
import LoginPage from "./pages/LoginPage";
import FavoritesPage from "./pages/FavoritesPage";
import PageLinks from "./components/PageLinks";
import Header from "./components/header";
import PageContainer from "./components/pageContainer";
import PersonalPage from "./pages/PersonalPage";
import RegisterPage from "./pages/RegisterPage";

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
					<Route path="register" element= {<RegisterPage />} />
					<Route path="book-catalogue" element={<BookCatalogue />} />
					<Route path="favorites" element={<FavoritesPage />} />
					<Route path="personal-page" element={<PersonalPage />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default AppRouter;
