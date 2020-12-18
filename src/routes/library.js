import React, { useState, useEffect } from 'react';
import './styles.css'
import LoginStatus from '../components/loginStatus';
import axios from '../components/axios';
import BookTile from '../components/bookTile';
import { Button } from 'react-bootstrap';

export default function Library() {
    document.title = "Library | Audible";
    const loginStatus = React.useContext(LoginStatus);
    const [books, setBooks] = useState();

    let length = loginStatus.inLibrary === undefined ? 0 : loginStatus.inLibrary.length;
    useEffect(() => {
        if (length === 0) {
            console.log("found undefined " + loginStatus.inLibrary);
            return;
        }
        axios.post('/books', { ids: loginStatus.inLibrary }).then(response => {
            console.log(response);
            setBooks(response.data);
        }).catch(err => { setBooks(); });
    }, [loginStatus.inLibrary,length])

    let libraryJSX = (
        <div className="empty-wishlist-body">
            <span className="empty-wishlist-heading">
                No items found in your Library.
            </span>
            Start building your Library with audiobooks that inspire and entertain.
            <Button variant="warning" className="empty-wishlist-btn" href="/explore">Explore Audio-Books</Button>
        </div>
    );

    if (books !== undefined) {
        libraryJSX = (
            <>
                {books.map(book => <BookTile key={book._id} book={book} />)}
            </>
        );

    }
    return (
        <>
            <div className="wishlist-container">
                <div className="wishlist-title-container">
                    <span className="wishlist-title">Library</span>
                    {length} items
            </div>
                <div className="wishlist-body">
                    {libraryJSX}
                </div>
            </div>
        </>
    );
}