import React, { useState, useEffect } from 'react';
import './styles.css'
import LoginStatus from '../components/loginStatus';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import axios from '../components/axios';
import BookTile from '../components/bookTile';
import { Button } from 'react-bootstrap';

export default function Wishlist(){
    const loginStatus = React.useContext(LoginStatus);
    const [books,setBooks] = useState();
    let length = loginStatus.inWishlist===undefined?0:loginStatus.inWishlist.length;
    useEffect(() => {
        if(length===0){
            console.log("found undefined " + loginStatus.inWishlist);
            return;
        }
        axios.post('/books',{ids: loginStatus.inWishlist}).then(response=>{
            console.log(response);
            setBooks(response.data);
        }).catch(err=>{setBooks();});
    }, [loginStatus.inWishlist])

    let wishlistJSX =(
        <div className="empty-wishlist-body">
            <span className="empty-wishlist-heading">
                No items found in your Wish List.
            </span>
            Start building your Wish List with audiobooks that inspire and entertain.
            <Button variant="warning" className="empty-wishlist-btn" href="http://localhost:3000/explore">Explore Audio-Books</Button>
        </div>
    );

    if (books !== undefined && loginStatus.inWishlist !== undefined && loginStatus.inWishlist.length > 0) {
        wishlistJSX = (
            <>
                {books.map(book => {
                    let passButton = (
                        <>
                            <Button variant="light" className="btn-inlist" onClick={() => { loginStatus.moveToCart(book._id) }}>Move To Cart</Button>
                            <Button variant="warning" onClick={() => { loginStatus.removeFromWishlist(book._id) }}>Remove From Wishlist</Button>
                        </>
                    );
                    return (<BookTile key={book._id} book={book} buttonJSX={passButton} />);
                })}
            </>
        );
    }
    return(
        <>       
        <Navbar/>
        <div className="wishlist-container">
            <div className="wishlist-title-container">
                <span className="wishlist-title">Wish List</span>
                {length} items
            </div>
            <div className="wishlist-body">
                {wishlistJSX}
            </div>
        </div>
        <Footer/>
        </>
    );
}