import React from 'react';
import axios from '../components/axios';
import Spinner from 'react-bootstrap/Spinner';
import {Redirect} from 'react-router-dom';
import universalCookie from 'universal-cookie';

export default function Verification(props){
    console.log(props);
    const cookies = new universalCookie();
    const styles = {
        display: "grid",
        placeContent: "center",
        width: "100vw",
        height: "100vh",
        letterSpacing: "2px",
        color: "#484848"
    };
    const spinnerStyle = { 
        width: "7rem", 
        height: "7rem", 
        fontSize: "2.5rem", 
        margin: "3rem auto" 
    };
    const [returnJSX,setReturnJSX] = React.useState(
        <div style={styles}>
            <h1>Verifying Your Account</h1>
            <Spinner variant="warning" animation="border" style={spinnerStyle} />
        </div>
    );
    React.useEffect(()=>{
        let cookie=cookies.get("sessionID");
        if(cookie!==undefined){
            setReturnJSX(<Redirect to="/" />);
            return;
        }
        axios.post("/verifyAccount",{token: props.match.params.token}).then(response=>{
            cookies.set("sessionID", response.data, { path: "/", maxAge: 60 * 60 * 1000 });
            setReturnJSX(<Redirect to="/"/>);
            return;
        }).catch(err=>{
            setReturnJSX(
                <div style={styles}>
                    <h1>Your token had expired!!! Go try again...</h1>
                </div>
            );
        });
    },[]);
    return returnJSX;
}