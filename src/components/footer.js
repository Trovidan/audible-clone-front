import React from 'react';
import './styles.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function FooterComponent() {

    const  helps= ["Contact Us", "Help", "How to Listen", "Listening Apps", "Mobile Site", "Audible Suno"];
    const  links= ["Facebook","Twitter","Instagram","Learn About Audible","Learn about membership"];
    const  promoteCategory= ["Best Sellers","New Releases","Indian Listens","Hindi Audiobooks","Free Shows & Audiobooks"];
    const  promoteGenre= ["Mysteries & Thrillers","Romance","Fiction","Sci-Fi & Fantasy","Self Development"];
    const  terms= ["Condition of Use", "Privacy Policy", "Interst-Based-Ads", "Recurring Payments", "India(English)"];
    
     
    return (
      <footer>
        <div className="footer-content">
          <Row>
            <Col>
                {helps.map(help => <Row key={help}>{help}</Row>)}
            </Col>
            <Col>
              {links.map(link => <Row key={link}>{link}</Row>)}
            </Col>
            <Col>
              {promoteCategory.map(category => <Row key={category}>{category}</Row>)}
            </Col>
            <Col>
              {promoteGenre.map(genre => <Row key={genre}>{genre}</Row>)}
            </Col>
          </Row>
        </div>
        <hr />
        <div className = "footer-content-term">
            <span>
              © Copyright 2000 - 2020 Pranav Inc.
            </span>
            {terms.map(term => <span key={term} className="pipe"><span className="pipe">|</span> {term}</span>)}
        </div>
      </footer>
    );
}
