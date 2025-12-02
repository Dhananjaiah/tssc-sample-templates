import React, { useEffect, useState } from "react";
import { getPet } from "../api.js";

export default function PetDetail({ petId, onBack }) {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getPet(petId)
      .then(setPet)
      .catch(() => setError("Pet not found"))
      .finally(() => setLoading(false));
  }, [petId]);

  return (
    <div className="card">
      <h2>Pet Detail</h2>
      {loading && <p>Loading pet details...</p>}
      {error && <p className="error">{error}</p>}
      {pet && (
        <div className="pet-detail">
          <p><strong>ID:</strong> {pet.id}</p>
          <p><strong>Name:</strong> {pet.name}</p>
          <p><strong>Species:</strong> {pet.species}</p>
        </div>
      )}
      <button className="back-btn" onClick={onBack}>Back to List</button>
    </div>
  );
}