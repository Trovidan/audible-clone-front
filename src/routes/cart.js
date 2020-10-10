import React, { useState, useEffect } from 'react';
import './styles.css'
import LoginStatus from '../components/loginStatus';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import axios from '../components/axios';
import BookTile from '../components/bookTile';
import { Button } from 'react-bootstrap';

export default function Cart() {
    const loginStatus = React.useContext(LoginStatus);
    const [books, setBooks] = useState();
    let length = loginStatus.inCart === undefined ? 0 : loginStatus.inCart.length;
    useEffect(() => {
        if (length === 0) {
            console.log("found undefined " + loginStatus.inCart);
            return;
        }
        axios.post('/books', { ids: loginStatus.inCart }).then(response => {
            console.log(response);
            setBooks(response.data);
        }).catch(err => { setBooks(); });
    }, [length, loginStatus.inCart])

    let CartJSX = (
        <div className="empty-wishlist-body">
            <span className="empty-wishlist-heading">
                No items found in your Cart.
            </span>
            Start building your Cart with audiobooks that inspire and entertain.
            <Button variant="warning" className="empty-wishlist-btn" href="http://localhost:3000/explore">Explore Audio-Books</Button>
        </div>
    );
    
    if (books !== undefined && loginStatus.inCart!== undefined && loginStatus.inCart.length>0) {
        CartJSX = (
            <>
                {books.map(book => {
                    let passButton = (
                        <>
                            <Button variant="light" className="btn-inlist" onClick={() => { loginStatus.moveToWishlist(book._id) }}>Move To Wishlist</Button>
                            <Button variant="warning"  onClick={() => { loginStatus.removeFromCart(book._id) }}>Remove From Cart</Button>
                        </>
                    );
                    return (<BookTile key={book._id} book={book} buttonJSX={passButton} />);
                })}
            </>
        );

    }
    return (
        <>
            <Navbar />
            <div className="wishlist-container">
                <div className="wishlist-title-container">
                    <span className="wishlist-title">Cart</span>
                    {length} items
            </div>
                <div className="wishlist-body">
                    {CartJSX}
                </div>
            </div>
            <Footer />
        </>
    );
}