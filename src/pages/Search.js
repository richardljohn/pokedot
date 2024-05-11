import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import { ClipLoader } from 'react-spinners';
import "../styles/search.css";

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [pokemonNames, setPokemonNames] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1400');
        const names = response.data.results.map(pokemon => pokemon.name);
        setPokemonNames(names);
        console.log("Pokemon Names Fetched.");
      } catch (error) {
        console.error('Error fetching Pokémon names:', error);
      }
    };

    fetchPokemonNames();
  }, []); 

  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          pokemonNames.filter(pokemonName =>
            new RegExp(`^.*${searchInput.toLowerCase().split('').join('.*')}.*$`).test(pokemonName.toLowerCase())
          ).map(pokemonName => fetchPokemonByName(pokemonName))
        );
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchInput.trim() !== '') {
      setLoading(true);
      if (typingTimeout) clearTimeout(typingTimeout);
      setTypingTimeout(setTimeout(() => handleSearch(), 500));
    } else {
      setPokemonList([]);
    }
  }, [searchInput, pokemonNames]);

  const fetchPokemonByName = async (pokemonName) => { 
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

      const { id, name, types, sprites } = response.data;
      const pokemonData = {
        id,
        name,
        types: types.map(type => type.type.name),
        sprite: sprites.front_default,
      };

      setPokemonList(prevList => [...prevList, pokemonData]);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
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
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color={"black"} loading={loading} size={150} aria-label="Loading Spinner"/>
        </div>
      ) : searchInput.trim() !== '' ? (
        <div className="search-results-container">
          {pokemonList.length > 0 ? (
            pokemonList
              .sort((a, b) => a.id - b.id)
              .map(pokemon => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))
          ) : (
            <p>No Pokémon Found</p>
          )}
        </div>
      ) : null}
    </>
  );
}

export default Search;