import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./searchContext";
import { UserProvider } from "./userContext"; 
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
import PrivateRoute from "./components/PrivateRoute";
import NotFoundPage from "./pages/NotFoundPage";
import PersonalNotesPage from "./pages/PersonalNotesPage";

function AppRouter() {
	return (
		<Router>
			<Header />
			<PageLinks />
			<UserProvider>
				<SearchProvider>
					<Routes>
						<Route path="/" element={<PageContainer />}>
							<Route index element={<Homepage />} />
							<Route path="login" element={<LoginPage />} />
							<Route path="register" element={<RegisterPage />} />
							<Route path="book-catalogue" element={<BookCatalogue />} />
							<Route path="/book/:id" element={<BookInfoPage />} />
							{/* Protected Routes */}
							<Route
								path="favorites"
								element={
									<PrivateRoute>
										<FavoritesPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="personal-page"
								element={
									<PrivateRoute>
										<PersonalPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="book-diary"
								element={
									<PrivateRoute>
										<BookDiary />
									</PrivateRoute>
								}
							/>
							<Route
								path="personal-notes"
								element={
									<PrivateRoute>
										<PersonalNotesPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="delete-account"
								element={
									<PrivateRoute>
										<DeleteAccountPage />
									</PrivateRoute>
								}
							/>
							<Route path="/not-found" element={<NotFoundPage />} />
							<Route path="*" element={<NotFoundPage />} />
						</Route>
					</Routes>
				</SearchProvider>
			</UserProvider>
		</Router>
	);
}

export default AppRouter;
