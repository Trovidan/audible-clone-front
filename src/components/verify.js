import React from 'react';
import axios from './axios';
import "./styles.css";
import {Button} from 'react-bootstrap';
export default function Verify (props) {
    const [buttonJSX,setButtonJSX] = React.useState(<Button variant="warning" onClick={()=>{sendMail()}}>Send Verification Email</Button>);
    
    const sendMail=async()=>{
        await axios.post('/verify/mail',{sessionID:props.sessionID}).then(response=>{
            setButtonJSX(<Button variant="light">Go check Your Mails!</Button>)
            setTimeout(() => { setButtonJSX(<Button variant="warning" onClick={() => { sendMail() }}>Resend Verification Email</Button>)},60*1000)
        }).catch(err=>{
            alert("Unable to send Mails!!!");
        });
    };


    return (
        <div className="verification-body">
            <div className="verification-container">
                <div className="verification-title">
                    Let's get your account verified
                </div>
                {buttonJSX}
            </div>
        </div>
    )
}