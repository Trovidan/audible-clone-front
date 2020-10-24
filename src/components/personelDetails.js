import React from 'react';
import axios from './axios';
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import cookie from 'universal-cookie';
import './styles.css';

export default function PersonelDetails(){
    const [error,setError] = React.useState(false);
    const [personelDetails,setPersonelDetails] = React.useState();  
    const cookies = new cookie();
    const fetchdetails= async ()=>{
        let details = {
            projection: "name _id password",
            sessionID: cookies.get("sessionID")
        };
        await axios.post("/user/details",details).then(response => {
            console.log(response.data);
            setPersonelDetails(response.data);           
            setError(false);
        }).catch(err => {
            setError(true);
        });
    }
    
    if(error){
        return (
            <div className="user-profile-error">
                Something Went Wrong!!!
            </div>
        );
    }
    else if(personelDetails === undefined){
        fetchdetails();
        return (
            < div className = "user-profile-error" >
                <Spinner animation="border" variant="warning" />
            </div >
        );
    }
    return(
        <div>
            <div>
                <span className="profile-section-details-title">Your Account Details</span>
                <span className="update-account-details">Update your Audible info </span>
            </div>
            <div>
                <Row>
                    <Col>
                        <span className= "account-details-title">Name: </span>
                        <span className="account-details">
                            {personelDetails.name} 
                        </span>
                    </Col>

                    <Col>
                        <span className="account-details-title">Email: </span>
                        <span className="account-details">
                            {personelDetails._id}
                        </span>
                    </Col>
                    <Col>
                        <span className="account-details-title">Password:</span>
                        <span className="account-details">
                            ********
                        </span>
                    </Col>
                </Row>
            </div>
        </div>
    );
}