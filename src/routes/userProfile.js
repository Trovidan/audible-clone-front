import React,{useState} from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import './styles.css';
import PersonelDetails from '../components/personelDetails';
import UserReviews from '../components/userReviews';
import PurchaseDetails from '../components/puchaseDetails';
import {Redirect} from 'react-router-dom';
import LoginStatus from '../components/loginStatus';

export default function UserProfile(){

    const [displaySection, setDisplaySection] = useState({component: PersonelDetails});
    var $displaySection = displaySection;
    const sections = [
        {
            title: "Account Details",
            component: PersonelDetails
        },
        {
            title: "Reviews",
            component: UserReviews
        }, 
        {
            title: "Purchase History",
            component: PurchaseDetails
        }
    ];

    return (
        <div>
            <Navbar/>
            <div className="profile-body">
                <div className="profile-title">User's Profile</div>
                <div className="profile-container">
                    <div className="profile-section-menu">
                        {sections.map(section => 
                            <div key={section.title}>
                                <button 
                                    className="profile-section-option"
                                    key={section.title} 
                                    onClick={()=>{setDisplaySection({component: section.component})}}
                                >
                                    {section.title}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="profile-section-details">
                        <$displaySection.component />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}