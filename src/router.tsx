import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import BookCatalogue from './pages/BookCatalogue';
import LoginPage from './pages/LoginPage';
import FavoritesPage from './pages/FavoritesPage';

const AppRouter: React.FC = () => {
  return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
					<Route path="/book-catalogue" element={<BookCatalogue />} />
          <Route path="/favorites" element={<FavoritesPage />} />
				</Routes>
			</div>
		</Router>
	);
};

export default AppRouter;