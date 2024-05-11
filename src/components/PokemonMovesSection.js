import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PokemonMovesSection = ({ pokemonId }) => {
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMoves = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        // Extract move data from the response
        const moveData = response.data.moves.map(move => ({
          name: move.move.name,
          learnedBy: move.version_group_details.map(detail => detail.move_learn_method.name)
        }));
        // Set moves
        setMoves(moveData);
      } catch (error) {
        console.error('Error fetching Pokémon moves:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoves();
  }, [pokemonId]);


  // Move Formatter Method
  const formatMoveName = (moveName) => {
    // Split the move name by dashes and capitalize each part
    const capitalizedWords = moveName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    // Join the capitalized words with a space
    return capitalizedWords.join(' ');
  };

  // Function to sort moves by learned method
  const sortMovesByLearnedMethod = (moves) => {
    return moves.sort((a, b) => {
      const learnedMethods = ['level-up', 'machine', 'egg', 'tutor'];
      return learnedMethods.indexOf(a.learnedBy[0]) - learnedMethods.indexOf(b.learnedBy[0]);
    });
  };

  return (
    <div>
      <h3>Moves</h3>
      {loading ? (
        <p>Loading moves...</p>
      ) : (
        <div>
          <h4>Level Up</h4>
          <ul>
            {sortMovesByLearnedMethod(moves.filter(move => move.learnedBy.includes('level-up'))).map((move, index) => (
              <li key={index}>{formatMoveName(move.name)}</li>
            ))}
          </ul>
          <h4>TMs/HMs</h4>
          <ul>
            {sortMovesByLearnedMethod(moves.filter(move => move.learnedBy.includes('machine'))).map((move, index) => (
              <li key={index}>{formatMoveName(move.name)}</li>
            ))}
          </ul>
          <h4>Egg Moves</h4>
          <ul>
            {sortMovesByLearnedMethod(moves.filter(move => move.learnedBy.includes('egg'))).map((move, index) => (
              <li key={index}>{formatMoveName(move.name)}</li>
            ))}
          </ul>
          <h4>Move Tutor</h4>
          <ul>
            {sortMovesByLearnedMethod(moves.filter(move => move.learnedBy.includes('tutor'))).map((move, index) => (
              <li key={index}>{formatMoveName(move.name)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonMovesSection;