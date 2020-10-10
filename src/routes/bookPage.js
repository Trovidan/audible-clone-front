import React, { useState, useEffect } from 'react';
import './styles.css'
import LoginStatus from '../components/loginStatus';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import axios from '../components/axios';
import { Button } from 'react-bootstrap';

export default function BookPage(props){
    const bookID = props.match.params.bookID; 
    console.log(props);
    const loginStatus = React.useContext(LoginStatus);
    const [book,setBook] = useState();
    let buttonJSX;
    useEffect(() => {
        if(book!==undefined){  
            return;
        }
        axios.post('/books',{ids: [bookID]}).then(res=>{
            setBook(res.data);
        }).catch(err=>{
            console.log("unable to find this book");
        })
    }, [book,bookID]);
    
    if(book===undefined){
        return(
            <>
                <Navbar />
                <div className="bookPage-notFound">
                    <span className="empty-wishlist-heading">
                        Looks like your book is not with us!
                        </span>
                        Let's wait around with audiobooks that inspire and entertain.
                    <Button variant="warning" className="empty-wishlist-btn" href="http://localhost:3000/explore">Explore Audio-Books</Button>
                </div>
                <Footer />
            </>
        );
    }
    let styles = {
        height: "26rem",
        backgroundImage: `url(${book[0].imageUri})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        backgroundColor: "#484848",
        backgroundPosition: "center"
    }

    if (loginStatus.inCart.includes(book[0]._id)) {
        buttonJSX = (
            <>
                <Button variant="light" className="btn-inlist" href="http://localhost:3000/cart">In Cart</Button>
            </>
        );
    }
    else if (loginStatus.inWishlist.includes(book[0]._id)) {
        buttonJSX = (
            <>
                <Button variant="warning" onClick={() => { loginStatus.moveToCart(book[0]._id) }}>Move To Cart</Button>
                <Button variant="light" className="btn-inlist" href="http://localhost:3000/wishlist">In Wish List</Button>
            </>
        );
    }
    else if (loginStatus.inLibrary.includes(book[0]._id)) {
        buttonJSX = (
            <>
                <Button variant="light" className="btn-inlist" href="http://localhost:3000/library">In Your Library</Button>
            </>
        );
    }
    else {
        buttonJSX = (
            <>
                <Button variant="warning" onClick={() => { loginStatus.addToCart(book[0]._id) }}>Add To Cart</Button>
                <Button variant="warning" onClick={() => { loginStatus.addToWishlist(book[0]._id) }}>Add To Wish List</Button>
            </>
        );
    }
    return(
        <>
            <Navbar />
            <div style = {styles}  >
                <div className="bookPage-blur">
                    <div className="bookPage-book-details">
                        <img src={book[0].imageUri} alt={book[0].title} />
                        <div className="bookPage-book-specs">
                            <span className="bookPage-title">
                                {book[0].title}
                            </span>
                            <div>
                                <span className="bookPage-book-details-placeholder">Written By: </span>
                                <span className="bookPage-book-details-description">{book[0].author.join()}</span>
                            </div>
                            <div>
                                <span className="bookPage-book-details-placeholder">Narrated By: </span>
                                <span className="bookPage-book-details-description">{book[0].narratedBy.join()}</span>
                            </div>
                            <div>
                                <span className="bookPage-book-details-placeholder">Length: </span>
                                <span className="bookPage-book-details-description">{book[0].length} mins</span>
                            </div>
                            <div>
                                <span className="bookPage-book-details-placeholder">Language: </span>
                                <span className="bookPage-book-details-description">{book[0].language}</span>
                            </div>
                        </div>
                        <div className="bookPage-price">
                            <span className="bookPage-price-placeholder">Price: ₹ {book[0].price} </span>
                            {buttonJSX}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}
