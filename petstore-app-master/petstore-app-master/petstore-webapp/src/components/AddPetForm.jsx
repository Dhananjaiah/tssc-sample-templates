import React, { useState } from "react";
import { addPet } from "../api.js";

export default function AddPetForm({ onBack }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await addPet({ id: Number(id), name, species });
      setSuccess(true);
      setId(""); setName(""); setSpecies("");
      setTimeout(onBack, 1200);
    } catch (err) {
      console.error(err);
      setError("Failed to add pet. ID may already exist.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2>Add New Pet</h2>
      <form className="pet-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID"
          value={id}
          onChange={e => setId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Species"
          value={species}
          onChange={e => setSpecies(e.target.value)}
          required
        />
        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Pet"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Pet added!</p>}
      <button className="back-btn" onClick={onBack}>Back to List</button>
    </div>
  );
}