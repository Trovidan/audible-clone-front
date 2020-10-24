import React, { useState } from 'react';
import './styles.css'
import LoginStatus from '../components/loginStatus.js';
import axios from '../components/axios.js';
import Review from '../components/review.js';
import { Button,Spinner } from 'react-bootstrap';

export default function BookPage(props){
    const bookID = props.match.params.bookID; 
    //console.log(props);
    const loginStatus = React.useContext(LoginStatus);
    const [book,setBook] = useState();
    let buttonJSX;
    const fetchBook= async() => {
        await axios.post('/books',{ids: [bookID]}).then(res=>{
            setBook(res.data[0]);
        }).catch(err=>{
            console.log("unable to find this book");
            setBook("notFound");
        })
    };
    React.useEffect(()=>{
        if(book===undefined){
            fetchBook();
        }
    });
    
    if(book===undefined){
        let spinnerStyle = {
            width: "5rem",
            height: "5rem",
            fontSize: "1.5rem",
            margin: "3rem auto"
        };
        return (
            <>
                <div className="bookPage-notFound">
                    <Spinner variant="warning" animation="border" style={spinnerStyle} />
                </div>
            </>
        );
    }
    if(book==="notFound"){
        return(
            <>
                <div className="bookPage-notFound">
                    <span className="empty-wishlist-heading">
                        Looks like your book is not with us!
                        </span>
                        Let's wait around with audiobooks that inspire and entertain.
                    <Button variant="warning" className="empty-wishlist-btn" href="/explore">Explore Audio-Books</Button>
                </div>
            </>
        );
    }
    let styles = {
        height: "26rem",
        backgroundImage: `url(${book.imageUri})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        backgroundColor: "#484848",
        backgroundPosition: "center"
    }

    if (loginStatus.inCart.includes(book._id)) {
        buttonJSX = (
            <>
                <Button variant="light" className="btn-inlist" href="/cart">In Cart</Button>
            </>
        );
    }
    else if (loginStatus.inWishlist.includes(book._id)) {
        buttonJSX = (
            <>
                <Button variant="warning" onClick={() => { loginStatus.moveToCart(book._id) }}>Move To Cart</Button>
                <Button variant="light" className="btn-inlist" href="/wishlist">In Wish List</Button>
            </>
        );
    }
    else if (loginStatus.inLibrary.includes(book._id)) {
        buttonJSX = (
            <>
                <Button variant="light" className="btn-inlist" href="/library">In Your Library</Button>
            </>
        );
    }
    else {
        buttonJSX = (
            <>
                <Button variant="warning" onClick={() => { loginStatus.addToCart(book._id) }}>Add To Cart</Button>
                <Button variant="warning" onClick={() => { loginStatus.addToWishlist(book._id) }}>Add To Wish List</Button>
            </>
        );
    }
    //console.log(book);
    return(
        <>
            <div style = {styles}  >
                <div className="bookPage-blur">
                    <div className="bookPage-book-details">
                        <img src={book.imageUri} alt={book.title} />
                        <div className="bookPage-book-specs">
                            <span className="bookPage-title">
                                {book.title}
                            </span>
                            <div>
                                <span className="bookPage-book-details-placeholder">Written By: </span>
                                <span className="bookPage-book-details-description">{book.author.join()}</span>
                            </div>
                            <div>
                                <span className="bookPage-book-details-placeholder">Narrated By: </span>
                                <span className="bookPage-book-details-description">{book.narratedBy.join()}</span>
                            </div>
                            <div>
                                <span className="bookPage-book-details-placeholder">Length: </span>
                                <span className="bookPage-book-details-description">{book.length} mins</span>
                            </div>
                            <div>
                                <span className="bookPage-book-details-placeholder">Language: </span>
                                <span className="bookPage-book-details-description">{book.language}</span>
                            </div>
                        </div>
                        <div className="bookPage-price">
                            <span className="bookPage-price-placeholder">Price: ₹ {book.price} </span>
                            {buttonJSX}
                        </div>
                    </div>
                </div>
            </div>
            <div className="book-summary">
                <div className="book-summary-title">Publisher's Summary</div>
                <div className="book-summary-body" dangerouslySetInnerHTML={{ __html: book.summary}}></div>
            </div>
            <Review reviews={book.reviews} rating={book.rating} totalReview={book.totalReview}/>
        </>
    );
}
