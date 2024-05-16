import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../styles/disclaimer.css';


// Disclaimer Page.

const Disclaimer = () => {
  return (
  <>
  
    <p className="title">Welcome to Pokédot</p>
    <Card className="disclaimer-card">
      <Card.Body>
        <Card.Title clsasName="disclaimer-title">Disclaimer</Card.Title>
        <Card.Text>
          The content provided in this application, including but not limited to Pokémon names, images, and other related information, is owned by The Pokémon Company, Nintendo, Game Freak, and Niantic. This application is created solely for educational and entertainment purposes, and I do not claim ownership of any Pokémon intellectual property. All Pokémon-related content and trademarks are the property of their respective owners.
        </Card.Text>
      </Card.Body>
      <Card.Footer className="disclaimer-footer">
        <Button variant="primary"><Link to="/pokedot/pokemon" className="disclaimer-link">Go to Pokédex</Link></Button>
      </Card.Footer>
    </Card>
  </>
  );
}

export default Disclaimer;