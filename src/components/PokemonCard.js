import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import '../styles/pokemoncard.css'

const PokemonCard = ({ pokemon }) => {
  if (!pokemon) {
    return null; // Render nothing if pokemon is undefined
  }

  const pokemonPrimaryType = pokemon.types[0];
  const cardBackgroundColor = getTypeColor(pokemonPrimaryType);

  let formattedName = pokemon.name.includes('-')
    ? pokemon.name.split('-').join(' (') + ')' // Format name with hyphen
    : pokemon.name;

  // Check if the name includes "mega-x" or "mega-y" and format accordingly
  if (pokemon.name.includes('mega-x') || pokemon.name.includes('mega-y')) {
    formattedName = formattedName.replace('mega-', '(Mega ');
    formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1); // Capitalize first letter
  }

  // const formatPokemonName = (name) => {
  //   // Split the name by "-"
  //   const parts = name.split("-");
    
  //   // Capitalize the first word and join the rest with spaces
  //   const formattedName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    
  //   // If there are additional parts (e.g., "mega-x"), format them inside parentheses
  //   if (parts.length > 1) {
  //     const additionalParts = parts.slice(1).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  //     return `${formattedName} (${additionalParts})`;
  //   }
    
  //   return formattedName;
  // };

  return (
    <Link to={`/pokemon/${pokemon.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card 
        style={{ 
          backgroundColor: cardBackgroundColor, 
          borderRadius: '10px', 
          margin: '10px 0', 
          cursor: 'pointer' 
        }} 
      >
        <Card.Header 
          style={{ 
            backgroundColor: 'black', 
            textAlign: 'center', 
            borderTopLeftRadius: '10px', 
            borderTopRightRadius: '10px', 
            padding: '10px' 
          }}
        >
          <h3 style={{ color: 'white', textTransform: 'capitalize', margin: 0 }}>
            #{pokemon.id.toString().padStart(3, '0')} {formattedName}
          </h3>
        </Card.Header>

        <Card.Body 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' , 
            padding: '10px'
          }}
        >
          <img 
            src={pokemon.sprite} 
            alt={pokemon.name} 
            style={{ width: '140px', height: '140px', marginBottom: '5px' }} 
          />
        </Card.Body>

        <Card.Footer 
          style={{ 
            backgroundColor: 'black', 
            display: 'flex', 
            justifyContent: 'center', 
            padding: '5px', 
            borderBottomLeftRadius: '10px', 
            borderBottomRightRadius: '10px' 
          }}
        >
          {pokemon.types.map((type, index) => (
            <span 
              key={index} 
              style={{
                borderRadius: '5px',
                padding: '5px',
                margin: '3px',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                backgroundColor: getTypeColor(type),
                border: '1px solid black', // Add black border to type badges
              }}
            >
              {type}
            </span>
          ))}
        </Card.Footer>
      </Card>
    </Link>
  );
};

// Function to get color for each type
const getTypeColor = (type) => {
  // Define or import the getTypeColor function
  switch (type) {
    // Add color values for each type
    case 'normal':
      return '#A8A878';
    case 'fire':
      return '#F08030';
    case 'water':
      return '#6890F0';
    case 'electric':
      return '#F8D030';
    case 'grass':
      return '#78C850';
    case 'ice':
      return '#98D8D8';
    case 'fighting':
      return '#C03028';
    case 'poison':
      return '#A040A0';
    case 'ground':
      return '#E0C068';
    case 'flying':
      return '#A890F0';
    case 'psychic':
      return '#F85888';
    case 'bug':
      return '#A8B820';
    case 'rock':
      return '#B8A038';
    case 'ghost':
      return '#705898';
    case 'dragon':
      return '#7038F8';
    case 'dark':
      return '#705848';
    case 'steel':
      return '#B8B8D0';
    case 'fairy':
      return '#EE99AC';
    default:
      return '#BDBDBD'; // Default gray color for unknown typings
  }
};

export default PokemonCard;