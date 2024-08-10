import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookCRUD = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: '', author: '' });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const handleAddBook = async () => {
        try {
            await axios.post('http://localhost:8080/api/books', newBook);
            setNewBook({ title: '', author: '' });
            fetchBooks();
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/books/${id}`);
            fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div>
            <h1>Books CRUD</h1>
            <input
                type="text"
                name="title"
                value={newBook.title}
                onChange={handleInputChange}
                placeholder="Title"
            />
            <input
                type="text"
                name="author"
                value={newBook.author}
                onChange={handleInputChange}
                placeholder="Author"
            />
            <button onClick={handleAddBook}>Add Book</button>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} by {book.author}
                        <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookCRUD;
