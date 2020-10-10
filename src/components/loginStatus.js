import React from 'react';

const LoginStatus = React.createContext({
    status: false,
    inCart: [],
    inLibrary: [],
    inWishlist: [],
    logIn: ()=>{},
    logOut: ()=>{},
    addToCart: ()=>{},
    addToWishlist: ()=>{},
    removeFromCart: ()=>{},
    removeFromWishlist: ()=>{},
    moveToWishlist:()=>{},
    moveToCart: ()=>{}
});
const LoginProvider = LoginStatus.Provider;
const LoginConsumer = LoginStatus.Consumer;

export {LoginProvider,LoginConsumer};
export default LoginStatus;