import React from 'react';
import logo from './images/svgIcons/audible_logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Navbar,Nav,NavDropdown } from 'react-bootstrap';
import LoginStatus from './loginStatus';


export default function NavbarComponent (){
  
  const loginStatus = React.useContext(LoginStatus);

  const logStatus= loginStatus.status;
  const loggedMenu= [
    {
      title: "Explore",
      link: "http://localhost:3000/explore" 
    },
    {
      title: "Library",
      link: "http://localhost:3000/library"
    },
    {
      title: "Wishlist",
      link: "http://localhost:3000/wishlist"
    },
    {
      title: "Cart",
      link: "http://localhost:3000/cart"
    }
  ];
  const menu= [
    {
      title: "Explore",
      link: "http://localhost:3000/explore"
    },
    {
      title: "Cart",
      link: "http://localhost:3000/cart"
    },
    {
      title: "Sign in",
      link: "http://localhost:3000/login"
    }
  ];
  const profileOptions= [
    {
      title: "Account",
      link: "http://localhost:3000/profile"
    },
    {
      title: "Orders",
      link: "http://localhost:3000/"
    },
    {
      title: "Credits",
      link: "http://localhost:3000/"
    },
    {
      title: "Return",
      link: "http://localhost:3000/"
    },
    {
      title: "Ask Question?",
      link: "http://localhost:3000/"
    }
  ];
    
  let navMenu = logStatus? loggedMenu : menu;
  let profile = logStatus?
            (
              <NavDropdown title="Profile" className = "nav-element" id="collasible-nav-dropdown">
                {profileOptions.map(option => <NavDropdown.Item key={option.title} href={option.link}>{option.title}</NavDropdown.Item> )}
              <NavDropdown.Divider />
              <NavDropdown.Item href="#"><button onClick={()=>{loginStatus.logOut(true)}}>Sign Out!</button></NavDropdown.Item>
              </NavDropdown>
            ) :
            "";
  return (
      <div className="navbar-container">
        <Navbar className= "custom-navbar" collapseOnSelect expand="lg" >
          <Navbar.Brand href="http://localhost:3000/">
            <img src={logo} className = "logo" alt="Logo"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav " />
          <Navbar.Collapse  id="responsive-navbar-nav toggle-nav-list">
            <Nav className="navbar-list">
              {navMenu.map(navItem => {
                let cartJSX = <></>, inCart = loginStatus.inCart;
                if(navItem.title === "Cart" && inCart!==undefined && inCart.length>0){
                  cartJSX = (
                  <span className="cart-quantity-indicator">{inCart.length}</span>
                  )
                }
                return (
                  <Nav.Link key={navItem.title} className="nav-element" href={navItem.link}>
                    {navItem.title}{cartJSX}
                  </Nav.Link>
                );
              })}
              {profile}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
  );
  
}