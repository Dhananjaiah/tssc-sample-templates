import React, { useEffect, useState } from "react";
import { getPets } from "../api.js";

export default function PetList({ onSelectPet, onAddPet }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getPets()
      .then(setPets)
      .catch(() => setError("Failed to load pets"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card">
      <h2>Pet List</h2>
      {loading && <p>Loading pets...</p>}
      {error && <p className="error">{error}</p>}
      <ul className="pet-list">
        {pets.map((pet) => (
          <li key={pet.id} className="pet-item" onClick={() => onSelectPet(pet.id)}>
            <span className="pet-name">{pet.name}</span>
            <span className="pet-species">{pet.species}</span>
          </li>
        ))}
      </ul>
      <button className="add-btn" onClick={onAddPet}>Add Pet</button>
    </div>
  );
}