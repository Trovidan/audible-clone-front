import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Switch,Redirect} from 'react-router-dom';
import universalCookie from 'universal-cookie';
import Home from "./routes/home";
import Login from "./routes/login";
import ProfilePage from './routes/userProfile';
import axios from './components/axios';
import CreateUser from './routes/createUser';
import Explore from './routes/explore';
import Wishlist from './routes/wishlist';
import Library from './routes/library';
import Cart from './routes/cart';
import Navbar from './components/navbar.js';
import Footer from './components/footer.js';
import {LoginProvider} from './components/loginStatus';
import BookPage from './routes/bookPage';
import Verification from './routes/verification';


export default function App(){
  const [auth,setAuth] = useState();
  const [list,setList] = useState({
    inLibrary: [],
    inCart: [],
    inWishlist: []
  });
  const cookies = new universalCookie();
  
  const fetchList = async () => {
    await axios.post('/user/getList',{sessionID: cookies.get("sessionID")}).then(response => {
      //console.log(response.data);
      setList({
        inLibrary: response.data.library,
        inCart: response.data.cart,
        inWishlist: response.data.wishlist
      });
    }).catch(err=>{
      console.log(err);
    })
  }
  const login=(sessionID)=>{
    cookies.set("sessionID", sessionID, { path: "/", maxAge: 60 * 60 * 1000 });
    fetchList();
    setAuth(true);
  }
  const logout = (deleteCookie) => {
    //TODO send session deletion request
    console.log("logging Out "+deleteCookie);
    if(deleteCookie){
      cookies.remove("sessionID");
      setList(
        {
          inLibrary: [],
          inCart: [],
          inWishlist: []
        }
      );
    }
    setAuth(false);
  };
  const addToCart=(id)=>{
    if(auth===true){
      axios.post('/user/updateRecord',{fieldName: "cart", val: id, type: 1, sessionID: cookies.get("sessionID")}).then(response=>{
        setList({
          inLibrary: [...list.inLibrary],
          inCart: [...list.inCart,id],
          inWishlist: [...list.inWishlist]
        });
      }).catch(err=>{
        alert("unable to add!");
      });
    }
    else{
      setList({
        inLibrary: [...list.inLibrary],
        inCart: [...list.inCart, id],
        inWishlist: [...list.inWishlist]
      });
    }
  };
  const removeFromCart = (id) => {
    let newCart = [];
    list.inCart.map(cart=>{
      if(id !== cart){
        newCart.push(cart);
      }
      return true;
    });
    if (auth === true) {
      axios.post('/user/updateRecord', { fieldName: "cart", val: id, type: 2, sessionID: cookies.get("sessionID") }).then(response => {
        setList({
          inLibrary: [...list.inLibrary],
          inCart: newCart,
          inWishlist: [...list.inWishlist]
        });
      }).catch(err => {
        alert("unable to add!");
      });
    }
    else {
      setList({
        inLibrary: [...list.inLibrary],
        inCart: newCart,
        inWishlist: [...list.inWishlist]
      });
    }
  };
  const addToWishlist = (id) => {
    if (auth === true) {
      axios.post('/user/updateRecord', { fieldName: "wishlist", val: id, type: 1, sessionID: cookies.get("sessionID") }).then(response => {
        setList({
          inLibrary: [...list.inLibrary],
          inCart: [...list.inCart],
          inWishlist: [...list.inWishlist,id]
        });
      }).catch(err => {
        alert("unable to add!");
      });
    }
    else {
      setList({
        inLibrary: [...list.inLibrary],
        inCart: [...list.inCart],
        inWishlist: [...list.inWishlist,id]
      });
    }
  };
  const removeFromWishlist = (id) => {
    let newWishlist = [];
    list.inWishlist.map(item => {
      if (id !== item) {
        newWishlist.push(item);
      }
      return true;
    });
    if (auth === true) {
      axios.post('/user/updateRecord', { fieldName: "wishlist", val: id, type: 2, sessionID: cookies.get("sessionID") }).then(response => {
        setList({
          inLibrary: [...list.inLibrary],
          inCart: [...list.inCart],
          inWishlist: newWishlist
        });
      }).catch(err => {
        alert("unable to add!");
      });
    }
    else {
      setList({
        inLibrary: [...list.inLibrary],
        inCart: [...list.inCart],
        inWishlist: newWishlist
      });
    }
  };
  const moveToWishlist = (id) => {
    let newCart = [];
    list.inCart.map(cart => {
      if (id !== cart) {
        newCart.push(cart);
      }
      return true;
    });
    if (auth === true) {
      axios.post('/user/updateRecord', { fieldName: "wishlist", val: id, fromFieldName: "cart", sessionID: cookies.get("sessionID") }).then(response => {
        setList({
          inLibrary: [...list.inLibrary],
          inCart: newCart,
          inWishlist: [...list.inWishlist, id]
        });
      }).catch(err => {
        alert("unable to add!");
      });
    }
    else {
      setList({
        inLibrary: [...list.inLibrary],
        inCart: newCart,
        inWishlist: [...list.inWishlist, id]
      });
    }
  };
  const moveToCart = (id) => {
    let newWishlist = [];
    list.inWishlist.map(item => {
      if (id !== item) {
        newWishlist.push(item);
      }
      return true;
    });
    if (auth === true) {
      axios.post('/user/updateRecord', { fieldName: "cart", val: id, fromFieldName: "wishlist", sessionID: cookies.get("sessionID") }).then(response => {
        setList({
          inLibrary: [...list.inLibrary],
          inCart: [...list.inCart, id],
          inWishlist: newWishlist
        });
      }).catch(err => {
        alert("unable to add!");
      });
    }
    else {
      setList({
        inLibrary: [...list.inLibrary],
        inCart: [...list.inCart, id],
        inWishlist: newWishlist
      });
    }
  };
  const checkSession= async ()=>{
    await axios.post('/signup/checkSession', {sessionID: cookies.get("sessionID")}).then(response => {
      if (response.data.status) {
        login(cookies.get("sessionID"));
      }
      else {
        logout(true);
      }
    }).catch(err => {
      console.log("unable to send checkSession cause of error: " + err);
      logout(false);
    });
  };
  useEffect( () => {
    let session = cookies.get("sessionID");
    if(session === undefined || auth===true){
      return;
    }
    else{
      console.log("checking session authenticity");
      checkSession();
    }   
  });

  const providerValues = {
    status: auth,
    inWishlist: list.inWishlist,
    inCart: list.inCart,
    inLibrary: list.inLibrary,
    logIn: login,
    logOut: logout,
    addToCart: addToCart,
    addToWishlist:addToWishlist,
    removeFromCart: removeFromCart,
    moveToWishlist: moveToWishlist,
    moveToCart: moveToCart,
    removeFromWishlist: removeFromWishlist
  };
  return (
    <LoginProvider value={providerValues}>
      <BrowserRouter >
        <Switch>
          <ProtectedLogin exact path="/login" auth={auth} component={Login} />
          <Route exact path="/verification/:token" auth={auth} component={Verification} />
          <ProtectedLogin exact path="/createUser" auth={auth} component={CreateUser} />
          <Route path="/">
            <Navbar/>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/explore" component={Explore} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/book/:bookID" component={BookPage} />
            <ProtectedRoute exact path="/profile" auth={auth} component={ProfilePage} />
            <ProtectedRoute exact path="/wishlist" auth={auth} component={Wishlist} />
            <ProtectedRoute exact path="/library" auth={auth} component={Library} />
            <Footer/>
          </Route>
        </Switch>
      </BrowserRouter>
    </LoginProvider>
  );
}

const ProtectedRoute = ({component: Component,auth: Auth, ...rest}) =>{
  if(Auth === undefined || Auth){
    return <Route {...rest} render={() => (<Component />)} />;
  }
  else{
    return <Redirect to="/login" />
  }
}


const ProtectedLogin = ({ component: Component, auth: Auth, ...rest }) => {
  // console.log(auth);
  if (Auth === undefined || !Auth){
    return <Route {...rest} render={() => (<Component />)} />;
  }
  else {
    return <Redirect to="/" />
  }
}