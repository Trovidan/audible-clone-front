import React from 'react';
import logo from './images/svgIcons/audible_logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Navbar,Nav,NavDropdown } from 'react-bootstrap';
import LoginStatus from './loginStatus';
import {Link} from 'react-router-dom';


export default function NavbarComponent (){
  
  const loginStatus = React.useContext(LoginStatus);

  const logStatus= loginStatus.status;
  const loggedMenu= [
    {
      title: "Explore",
      link: "/explore" 
    },
    {
      title: "Library",
      link: "/library"
    },
    {
      title: "Wishlist",
      link: "/wishlist"
    },
    {
      title: "Cart",
      link: "/cart"
    }
  ];
  const menu = [
    {
      title: "Explore",
      link: "/explore"
    },
    {
      title: "Cart",
      link: "/cart"
    },
    {
      title: "Sign in",
      link: "/login"
    }
  ];
  const profileOptions= [
    {
      title: "Account",
      link: "/profile"
    },
    {
      title: "Orders",
      link: "/"
    },
    {
      title: "Credits",
      link: "/"
    },
    {
      title: "Return",
      link: "/"
    },
    {
      title: "Ask Question?",
      link: "/"
    }
  ];
    
  let navMenu = logStatus? loggedMenu : menu;
  let profile = logStatus?
            (
              <NavDropdown title="Profile" className = "nav-element" id="collasible-nav-dropdown">
        {profileOptions.map(option => <NavDropdown.Item key={option.title}><Link className="nav-element"to={option.link}>{option.title}</Link></NavDropdown.Item> )}
              <NavDropdown.Divider />
              <NavDropdown.Item href="#"><button onClick={()=>{loginStatus.logOut(true)}}>Sign Out!</button></NavDropdown.Item>
              </NavDropdown>

            ) :
            "";
  return (
      <div className="navbar-container">
        <Navbar className= "custom-navbar" collapseOnSelect expand="lg" >
          <Navbar.Brand href="/">
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
                  <Nav.Link key={navItem.title} className="nav-element" >
                  <Link key={navItem.title} className="nav-element" to={navItem.link}>
                    {navItem.title}{cartJSX}
                  </Link>
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