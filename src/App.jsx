import './App.css'
import React, { useState, useEffect } from 'react';

function App() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/location')
      .then((response) => response.json())
      .then((data) => {
        setLocations(data.results);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      fetch(selectedLocation)
        .then((response) => response.json())
        .then((data) => {
          setCharacters(data.residents);
        })
        .catch((error) => console.error('Error:', error));
    }
  }, [selectedLocation]);

  const handleLocationChange = (event) => {
    const selectedLocationUrl = event.target.value;
    setSelectedLocation(selectedLocationUrl);
  };

  return (
    <div className="App">
      <h1>RICK AND MORTY CHARACTERS BY LOCATION</h1>
      <label htmlFor="location-select">Select a Location:</label>
      <select id="location-select" value={selectedLocation} onChange={handleLocationChange}>
        <option value="">Select</option>
        {locations.map((location) => (
          <option key={location.url} value={location.url}>
            {location.name}
          </option>
        ))}
      </select>
      <div id="characters-container">
        {characters.map((characterUrl) => (
          <CharacterCard key={characterUrl} characterUrl={characterUrl} />
        ))}
      </div>
    </div>
  );
}

function CharacterCard({ characterUrl }) {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch(characterUrl)
      .then((response) => response.json())
      .then((data) => {
        setCharacter(data);
      })
      .catch((error) => console.error('Error:', error));
  }, [characterUrl]);

  if (!character) {
    return null;
  }

  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p>Species: {character.species}</p>
      <p>Status: {character.status}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Episodes: {character.id}</p>
    </div>
  );
}

export default App;

