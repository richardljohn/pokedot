import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import { BeatLoader } from 'react-spinners';
import "../styles/pokemonlist.css";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1400');
        const newData = await Promise.all(response.data.results.map(async (pokemon) => {
          const pokemonDetailsResponse = await axios.get(pokemon.url);
          return {
            id: pokemonDetailsResponse.data.id,
            name: pokemonDetailsResponse.data.name,
            types: pokemonDetailsResponse.data.types.map(type => type.type.name),
            sprite: pokemonDetailsResponse.data.sprites.front_default,
          };
        }));
        setPokemonList(newData);
        setFilteredPokemonList(newData);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchInput(searchTerm);
    filterPokemonList(searchTerm);
  };

  const filterPokemonList = (searchTerm) => {
    const filteredData = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
    setFilteredPokemonList(filteredData);
  };

  return (
    <>
      <div className="search-container">
        <input
          className="search-bar"
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search for a Pokémon"
        />
      </div>

      <div className="pokemon-list-container">
        <div className="pokemon-cards-container">
          {loading ? (
            <div className="spinner-container">
              <BeatLoader color={"black"} loading={loading} size={20} aria-label="Loading Spinner"/>
            </div>
          ) : searchInput === '' ? (
            // Render all Pokemon if search input is empty
            filteredPokemonList.map((pokemon) => (
              <div className="mobile-card-wrapper" key={pokemon.id}>
                <PokemonCard pokemon={pokemon} />
              </div>
            ))
          ) : filteredPokemonList.length === 0 ? (
            // No results found
            <p>No Pokémon Found</p>
          ) : (
            // Render filtered Pokemon
            filteredPokemonList.map((pokemon) => (
              <div className="card-wrapper" key={pokemon.id}>
                <PokemonCard pokemon={pokemon} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default PokemonList;