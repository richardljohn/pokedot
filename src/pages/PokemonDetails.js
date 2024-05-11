import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Statbar from '../components/Statbar';
import PokemonMovesSection from '../components/PokemonMovesSection';
import '../styles/pokemondetails.css';

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [englishDescription, setEnglishDescription] = useState('');
  const [pokemonDescription, setPokemonDescription] = useState('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPokemonData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    const fetchPokemonSpeciesData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const englishEntry = data.flavor_text_entries.find(entry => entry.language.name === 'en');
        if (englishEntry) {
          setEnglishDescription(englishEntry.flavor_text);
        }

        const pokemonDescriptionName = data.genera.find(genus => genus.language.name === 'en');
        setPokemonDescription(pokemonDescriptionName);
        console.log(pokemonDescription);
      } catch (error) {
        console.error('Error fetching species data:', error);
      }
    };

    fetchPokemonData();
    fetchPokemonSpeciesData();
  }, [id]);

  const formatName = (moveName) => {
    return moveName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  if (isLoading) {
    return (
      <div className="pokemon-details-container">
        <div className="section-box">Loading...</div>
      </div>
    );
  }

  if (!pokemonData) {
    return (
      <div className="pokemon-details-container">
        <div className="section-box">Error. Could not fetch data.</div>
      </div>
    );
  }

  const capitalizedPokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);

  return (
    <div className="pokemon-details">
      <div className="center-top">
        <Button className="pokedex-back-link"><Link className="pokedex-back-link" to="/pokemon">Back to Pokédex</Link></Button>
      </div>
      <div className={`pokemon-details-container`}>
        <h1>#{id.toString().padStart(3, '0')} {capitalizedPokemonName}</h1>

        <div className="sprite-container">
          <div className="section-box">
            <h2>{pokemonData.sprites.front_female ? 'Regular Male' : 'Regular'} {capitalizedPokemonName}</h2>
            <img src={pokemonData.sprites.front_default} alt={`Regular ${capitalizedPokemonName}`} />
          </div>
          {pokemonData.sprites.front_shiny && (
            <div className="section-box">
              <h2>{pokemonData.sprites.front_female ? 'Shiny Male' : 'Shiny'} {capitalizedPokemonName}</h2>
              <img src={pokemonData.sprites.front_shiny} alt={`Shiny ${capitalizedPokemonName}`} />
            </div>
          )}
          {pokemonData.sprites.front_female && (
            <div className="section-box">
              <h2>Regular Female {capitalizedPokemonName}</h2>
              <img src={pokemonData.sprites.front_female} alt={`Female ${capitalizedPokemonName}`} />
            </div>
          )}
          {pokemonData.sprites.front_shiny_female && (
            <div className="section-box">
              <h2>Shiny Female {capitalizedPokemonName}</h2>
              <img src={pokemonData.sprites.front_shiny_female} alt={`Shiny Female ${capitalizedPokemonName}`} />
            </div>
          )}
        </div>

        {englishDescription && (
          <div className="section-box">
            <h2>Description</h2>
            <p>{englishDescription}</p>
          </div>
        )}

        <div className="section-box">
          <h2>Stats</h2>
          <ul>
            {pokemonData.stats.map((stat, index) => (
              <li className="stat" key={index}>
                <Statbar statName={formatName(stat.stat.name)} statValue={stat.base_stat} />
              </li>
            ))}
          </ul>
        </div>

        <div className="section-box">
          <PokemonMovesSection pokemonId={id} />
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;