import React, { useEffect, useState } from 'react';
import './styles.css'
import LoginStatus from '../components/loginStatus';
import axios from '../components/axios';
import StarRatings from 'react-star-ratings';
import { Button, Spinner } from 'react-bootstrap';

export default function Review(props){
    const [reviews,setReviews]=useState();
    const fetchReviews = async (reviews) => {
        console.log("fetching req");
        console.log(reviews);
        await axios.post('/review/fetch', { reviews: reviews }).then(response => {
            setReviews(response.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(()=>{
        if(reviews!==undefined || props.reviews === undefined || props.totalReview === 0){
            return;
        }
        fetchReviews(props.reviews);
    });
    if(reviews===undefined){
        console.log(props.rating);
        return (<></>);
    }
    console.log(reviews);
    return(
        <div className="review-body">
            <div className="review-overview">
                <span className="review-overview-title">
                    See What people say about this book
                    <span className="review-overview-sub">{props.totalReview} Review, overall average {props.rating} out of 5</span>
                </span>
                <StarRatings rating = {props.rating} starRatedColor= "Orange" numberOfStars = {5} starDimension= '3rem' starSpacing="5px" /> 
                
            </div>
            
            {reviews.map( review=>
                <div className="user-review">
                    <div className="user-review-overview">
                        <StarRatings rating={review.rating} starRatedColor="Orange" numberOfStars={5} starDimension='1.5rem' starSpacing="3px" />
                        {review.user_name}
                    </div>  
                    <div className="user-review-details">
                        <div className="user-review-title">
                            {review.title}
                        </div>
                        <div className="user-review-body">
                            {review.body}
                        </div>   
                    </div>
                </div>    
            )}
        </div>
    );
}
