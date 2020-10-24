import React from 'react';
import Button from 'react-bootstrap/Button';
import "./styles.css";
import {Link} from 'react-router-dom';
import LoginStatus from './loginStatus';

export default function BookTile(props){
    const book = props.book;
    const loginStatus = React.useContext(LoginStatus);
    let buttonJSX = props.buttonJSX;
    if(buttonJSX===undefined){
        if (loginStatus.inCart.includes(book._id)){
            buttonJSX = (
                <>
                    <Link className="btn btn-inlist" to="/cart">In Cart</Link>
                </>
            );
        }
        else if(loginStatus.inWishlist.includes(book._id)){
            buttonJSX = (
                <>
                    <Button variant="warning" onClick={() => { loginStatus.moveToCart(book._id) }}>Move To Cart</Button>
                    <Link className="btn btn-inlist" to="/wishlist">In Wish List</Link>
                </>
            );
        }
        else if(loginStatus.inLibrary.includes(book._id)){
            buttonJSX = (
                <>
                    <Link className="btn btn-inlist" to="/library">In Your Library</Link>
                </>
            );
        }
        else{
            buttonJSX = (
                <>
                    <Button variant="warning" onClick={() => { loginStatus.addToCart(book._id) }}>Add To Cart</Button>
                    <Button variant="warning" onClick={() => { loginStatus.addToWishlist(book._id)}}>Add TO Wish List</Button>
                </>
            );
        }
    }
    return (
        <div className="bookTile">
            <a className="bookTile-image" href= {`/book/${book._id}`} >
                <img src={book.imageUri} alt={book.title} />
            </a>
            <div className= "bookTile-details">
                <a className="bookTile-title" href={`/book/${book._id}`}>
                    {book.title}
                </a>
                <div>
                    <span className="bookTile-placeholder">Written By: </span>
                    <span className="bookTile-description">{book.author.join()}</span>
                </div>
                <div>
                    <span className="bookTile-placeholder">Narrated By: </span>
                    <span className="bookTile-description">{book.narratedBy.join()}</span>
                </div>
                <div>
                    <span className="bookTile-placeholder">Length: </span>
                    <span className="bookTile-description">{book.length} mins</span>
                </div>
                <div>
                    <span className="bookTile-placeholder">Language: </span>
                    <span className="bookTile-description">{book.language}</span>
                </div>
            </div>
            <div className="bookTile-price">
                <div>
                <span className="bookTile-placeholder">Price: </span>
                <span className="bookTile-description"> ₹ {book.price}</span>
                </div>
                {buttonJSX}
            </div>
        </div>
    )
}