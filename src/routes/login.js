import React,{useState}from "react";
import './styles.css';
import axios from "../components/axios";
import logo from './images/svgIcons/audible_logo.svg';
import Button from 'react-bootstrap/Button';
import LoginStatus from '../components/loginStatus';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Verify from '../components/verify';
export default function Login(){
    document.title = "Login | Audible";
    const loginStatus = React.useContext(LoginStatus);

    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [error,setError] = useState("");
    const [verification,setVerification] = useState();
    async function tryLogin(e){

        e.preventDefault(); 
       
        await axios.post('/signup/login',{
            email: email,
            password: password
        }).then( (response) => {
            // console.log(response);
            if(response.data.verified===true){
                loginStatus.logIn(response.data.sessionID);
                return;
            }
            else{
                setVerification(response.data.sessionID);
                return;
            }
        }).catch(err => {
            if (err.response===undefined){
                setError("Unable to reach the server, try again later.")
                return;
            }
            else{
                setError(err.response.data);
                return;
            }
        });
    }

    if(verification!==undefined){
        return (
            <Verify sessionID = {verification}/>
        );
    }

    let errorJSX = <div></div>;
    if(error !== ""){
        errorJSX = (
            <div className = "login-error">
                <div className="login-error-title">There was a problem!</div>
                <p className= "login-error-reason">
                    {error}
                </p>
            </div>
        );
    }
    return(
        
        <div className="login-body">
            <img src={logo} className="login-logo" alt="audible_logo" />
            <div className="login-container">   
                <span className="login-title">Existing User? Sign in</span>
                <div className="login-input-container">
                    <span className="login-input-title">Registered E-mail</span>
                    <input type="email" value={email} className="login-input-field" onChange={e => { setEmail(e.target.value) }} />
                </div>
                    
                <div className="login-input-container">
                    <span className="login-input-title">Password</span>
                    <input type="password" value={password} className="login-input-field" onChange ={e => {setPassword(e.target.value)}} />
                </div>
                <Button variant="warning" onClick={tryLogin}>Sign in</Button>
                <Row>
                    <Col><hr/></Col>
                    <Col md="auto">New to Audible?</Col>
                    <Col><hr /></Col>
                    <a href="/createUser"><Button variant="light" >Create New Account</Button></a>
                </Row>
                
            </div>
            {errorJSX}  
        </div>
    );
}