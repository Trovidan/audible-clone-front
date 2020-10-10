import React from 'react';
import './styles.css';


export default class CarouselCard extends React.Component{
  render(){
    return (
      <div className="card-container" >
        <img className="card-image" src={this.props.uri} alt="BookImage" />
      </div>
    );
  }
}
