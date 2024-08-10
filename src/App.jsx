import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookCRUD from './components/BookCRUD';
import RentalCRUD from './components/RentalCRUD';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/books">Books</Link></li>
                        <li><Link to="/rentals">Rentals</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/books" element={<BookCRUD />} />
                    <Route path="/rentals" element={<RentalCRUD />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
