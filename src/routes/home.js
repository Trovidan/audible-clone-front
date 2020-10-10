import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar.js';
import Footer from '../components/footer.js';
import ExplainStrip from '../components/explainStrip.js';
import Carousel from '../components/carousel.js';
import './styles.css';
import axios from '../components/axios.js'

export default function Home(){

    const stripContent = [
        {
            uri: "./images/first.svg",
            text: "Log in securely with your Amazon account."
        },
        {
            uri: "./images/second.svg",
            text: "Sign-up for your free trial. Use the credit on any audiobook of your choice"
        },
        {
            uri: "./images/third.svg",
            text: "Download the free Audible app and start listening!"
        },
    ];

    const [cardDetails, setCardDetails] = useState([]);

    useEffect(() => {
        axios.post('/books').then(response => {
            setCardDetails(response.data);
        });

    }, []);

    return (
        <div className="App">
            <Navbar />
            <div className="audible-motto-container">
                <div className="audible-motto">
                    <span className="audible-motto-title">BOOKS. STORIES.</span><br />
                    <span className="audible-motto-title">TALK SHOWS.</span><br />
                    <span className="audible-motto-title">LIFE LESSONS.</span><br />
                    <span className="audible-motto-promo">Try Audiobooks today. Cancel Anytime.</span>
                </div>
            </div>
            <Carousel carouselID="0" cardDetails={cardDetails} />
            <ExplainStrip details={stripContent} title="How to Start?" />
            <Footer />
        </div>
    );
}
