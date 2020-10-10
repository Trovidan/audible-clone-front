import React, { useState } from "react";
import './styles.css';
import axios from "../components/axios";
import logo from './images/svgIcons/audible_logo.svg';
import Button from 'react-bootstrap/Button';
import Verify from '../components/verify';

export default function CreateUser() {
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error,setError] = useState("");
    const [verification, setVerification] = useState();
    let errorJSX = (
        <div className ="createUser-phantom-error"></div>
    );

    const createAccount = ()=>{
        let passLength = password.length;
        if(password === "" || confirmPassword === "" || email ==="" || name===""){
            setError("Please enter all the fields");
            return;
        }
        if(passLength<6){
            setError("Please choose a valid Password!");
            return;
        }
        if(password !== confirmPassword){
            setError("Entered incorrect Confirm Password!");
            return;
        }
        let details = {
            name: name,
            email: email,
            password: password
        }
        axios.post('/createAccount',details).then((response)=>{
            setError("");
            setVerification(response.data.sessionID);
            return;
        }).catch((err)=>{
            setError(err.response.data);
        });
    }

    if (verification !== undefined) {
        return (
            <Verify sessionID={verification} />
        );
    }
    
    if(error !== ""){
        errorJSX = (
            <div className="login-error">
                <div className="login-error-title">There was a problem!</div>
                <p className="login-error-reason">
                    {error}
                </p>
         </div>
        )
    }
    return (
        <div className="login-body">
            <a href="http://localhost:3000"><img src={logo} className="login-logo" alt="audible_logo" /></a>
            <div className="createUser-container">
                <span className="login-title">Create User</span>
                <div className="login-input-container">
                    <span className="login-input-title">Your Name</span>
                    <input className="login-input-field" type="text" value={name} onChange={e => { setName(e.target.value) }} />
                </div>
                <div className="login-input-container">
                    <span className="login-input-title">Email</span>
                    <input className="login-input-field" type="text" value={email} onChange={e => { setEmail(e.target.value) }} />
                </div>
                <div className="login-input-container">
                    <span className="login-input-title">Password</span>
                    <input className="login-input-field" type="password" value={password} onChange={e => { setPassword(e.target.value) }} placeholder="min 6 characters" />
                </div>
                <div className="login-input-container">
                    <span className="login-input-title">Confirm Password</span>
                    <input className="login-input-field" type="text" value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value) }} />
                </div>
                <Button variant="warning" onClick={() => { createAccount() }}>Create</Button>
            </div>
            {errorJSX}
        </div>
    );
}