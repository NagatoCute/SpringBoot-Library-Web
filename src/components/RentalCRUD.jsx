// RentalCRUD.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css'; // 导入 CSS 文件

const RentalCRUD = () => {
    const [books, setBooks] = useState([]);
    const [rentals, setRentals] = useState([]);
    const [newRental, setNewRental] = useState({ bookId: '', startDate: '', endDate: '' });

    useEffect(() => {
        fetchBooks();
        fetchRentals();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const fetchRentals = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/rentals');
            setRentals(response.data);
        } catch (error) {
            console.error('Error fetching rentals:', error);
        }
    };

    const handleAddRental = async () => {
        try {
            await axios.post('http://localhost:8080/api/rentals', {
                book: { id: newRental.bookId },
                startDate: newRental.startDate,
                endDate: newRental.endDate
            });
            setNewRental({ bookId: '', startDate: '', endDate: '' });
            fetchRentals();
        } catch (error) {
            console.error('Error adding rental:', error);
        }
    };

    const handleDeleteRental = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/rentals/${id}`);
            fetchRentals();
        } catch (error) {
            console.error('Error deleting rental:', error);
        }
    };

    return (
        <div className="container">
            <h2>Rentals</h2>
            <div>
                <select
                    value={newRental.bookId}
                    onChange={(e) => setNewRental({ ...newRental, bookId: e.target.value })}
                >
                    <option value="">Select Book</option>
                    {books.map((book) => (
                        <option key={book.id} value={book.id}>
                            {book.title}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    value={newRental.startDate}
                    onChange={(e) => setNewRental({ ...newRental, startDate: e.target.value })}
                />
                <input
                    type="date"
                    value={newRental.endDate}
                    onChange={(e) => setNewRental({ ...newRental, endDate: e.target.value })}
                />
                <button onClick={handleAddRental}>Add Rental</button>
            </div>
            <ul>
                {rentals.map(rental => (
                    <li key={rental.id}>
                        Book ID: {rental.book.id}, Start Date: {rental.startDate}, End Date: {rental.endDate}
                        <button className="delete" onClick={() => handleDeleteRental(rental.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RentalCRUD;
