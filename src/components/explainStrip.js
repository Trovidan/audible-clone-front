import React from 'react';
import './styles.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ExplainStrip(props){
  return(
    <div className="explainStrip-container">
      <h4 className = "explainStrip-title">{props.title}</h4>
      <Row>
        {props.details.map( detail => <Col key={detail.uri}>
            <img src={detail.uri} className="explainStrip-image" alt="explain" />
            <div className="explainStrip-text">
              <p>{detail.text}</p>
            </div>
          </Col>)}
      </Row>
    </div>
  );
}
