import React from 'react';
import './styles.css';
import Cards from './cards.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import left from './images/svgIcons/left-arrow.svg';
import right from './images/svgIcons/right-arrow.svg';

export default class Carousel extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      start: 0
    };
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }

  handleLeftClick(){
    let newStart = this.state.start - 6;
    
    if(newStart<0){
      this.carouselAnimationLeftEnd();
      return ;
    }
    this.carouselAnimationLeft();
    this.setState({start : newStart});
  }

  handleRightClick(){
    let newStart = this.state.start + 6;
    let totalCards = Math.floor(this.props.cardDetails.length/6)*6;

    if(newStart + 6 > totalCards){
      this.carouselAnimationRightEnd();
      return ;
    }
    this.carouselAnimationRight();
    this.setState({ start: newStart });
  }

  carouselAnimationLeft() {

    let element = document.getElementsByClassName("carousel-row-container");
    console.log(element[this.props.carouselID].style);
    
    function animate(element, margin, opacity, change) {
      console.log("animating");
      if (margin >= 0)
        return;
      let newMargin = margin + change * 500;
      let newOpacity = opacity + change ;
      element.marginLeft = (newMargin.toString() + "px");
      element.opacity = newOpacity.toString();
      window.setTimeout(function () { animate(element, newMargin, newOpacity, change) }, 10);
    };
    animate(element[this.props.carouselID].style, -500, 0, 0.05);
  }

  carouselAnimationLeftEnd() {
    console.log("animation");
    let element = document.getElementsByClassName("carousel-row-container");
    function changeLeft(element, margin, change, threshold) {
      if (margin === threshold) {
        if (threshold > 0) {
          window.setTimeout(function () { changeLeft(element, threshold, -change, 0) }, 300);
        }
        return;
      }
      let newMargin = margin + change;
      element.marginLeft = (newMargin.toString() + "px");
      window.setTimeout(function () { changeLeft(element, newMargin, change, threshold) }, 1);
    };

    changeLeft(element[this.props.carouselID].style, 0, 5, 100);
  }

  carouselAnimationRight() {
    console.log("right animation");
    let element = document.getElementsByClassName("carousel-row-container");
    console.log(element[this.props.carouselID].style);

    function animate(element, margin, opacity, change) {
      if (margin <= 0)
        return;
      let newMargin = margin - change * 500;
      let newOpacity = opacity + change;
      element.marginLeft = (newMargin.toString() + "px");
      element.opacity = newOpacity.toString();
      window.setTimeout(function () { animate(element, newMargin, newOpacity, change) }, 10);
    };
    animate(element[this.props.carouselID].style, 500, 0, 0.05);
  }

  carouselAnimationRightEnd() {
    console.log("animation");
    let element = document.getElementsByClassName("carousel-row-container");
    function changeLeft(element, margin, change, threshold) {
      if (margin === threshold) {
        if (threshold < 0) {
          window.setTimeout(function () { changeLeft(element, threshold, -change, 0) }, 300);
        }
        return;
      }
      let newMargin = margin + change;
      element.marginLeft = (newMargin.toString() + "px");
      window.setTimeout(function () { changeLeft(element, newMargin, change, threshold) }, 1);
    };

    changeLeft(element[this.props.carouselID].style, 0, -5, -100);
  }

  render(){
    let totalCards = this.props.cardDetails.length;
    let displaySize = 6;
    if(totalCards < displaySize){
      return (<div></div>);
    }

    let displayCards = [];
    for(let i = 0; i<displaySize;i++){
      displayCards.push(this.props.cardDetails[i + this.state.start]);
    }
    console.log("carousel");
    console.log(displayCards);
    return (
      <div className="carousel">
        <div className="carousel-row-container">
          <Row className="carousel-row">
            {displayCards.map(card =>
              <Col key={card._id}> <Cards uri={card.imageUri} link={`/book/${card._id}`}/></Col>)
            }
          </Row>
        </div>
        <div className= "carousel-button-container">
          <button className="carousel-button carousel-button-left" onClick = {this.handleLeftClick}>
              <img src={left} alt="left"/>
          </button>
          <button className="carousel-button carousel-button-right" onClick = {this.handleRightClick}>
            <img src={right} alt="right"/>
          </button>
        </div>
      </div>
    );
  }
}
