import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import PokemonList from './components/PokemonList';
import PokemonDetails from "./pages/PokemonDetails";
import Disclaimer from './pages/Disclaimer'
import axios from 'axios';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1400');
        const pokemonData = response.data.results.map(pokemon => ({
          id: pokemon.url.split('/').reverse()[1],
          name: pokemon.name
        }));
        setPokemonList(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="pokedot/" element={<Disclaimer />} />
        <Route path="pokedot/pokemon" element={<PokemonList pokemonList={pokemonList} loading={loading} />} />
        <Route path="pokedot/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;