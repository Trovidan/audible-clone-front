import React,{useState} from 'react';
import Navbar from './navbar';
import Footer from './footer';
import PersonelDetails from './personelDetails';

 
export default function UserProfile(){

    const [section,useSection] = useState(0);
    const sections = [
        {
            title: "Personel Details",
            component: "personelDetails"
        },
        {
            title: "Reviews",
            component: "userReviews"
        }, 
        {
            title: "Purchase History",
            component: "purchaseDetails"
        }
    ];
    return (
        <div>
            <Navbar/>
            <div className="profile-body">
                <div className="profile-title">User's account</div>
                <div className="profile-container">
                    <div className="profile-section-menu">
                        {sections.map(section => <div><button className="profile-section-option">{section.title}</button></div>)}
                    </div>
                    <div className="profile-section-details">
                        <PersonelDetails />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}