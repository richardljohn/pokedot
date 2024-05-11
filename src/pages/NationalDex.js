import React from 'react';
import PokemonCard from '../components/PokemonCard';
import { BeatLoader } from 'react-spinners';

const NationalDex = ({ pokemonList, loading }) => {

  return (
    <div className="pokemon-list-container">
      <div className="pokemon-cards-container" style={{ marginTop: '50px' }}>
        {loading ? (
          <div className="spinner-container">
            <BeatLoader color={"black"} loading={loading} size={20} aria-label="Loading Spinner"/>
          </div>
        ) : (
          pokemonList.map((pokemon) => (
            <div className="mobile-card-wrapper" key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default NationalDex;