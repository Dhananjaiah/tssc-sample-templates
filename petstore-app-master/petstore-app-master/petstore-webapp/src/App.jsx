import React, { useState } from "react";
import PetList from "./components/PetList.jsx";
import PetDetail from "./components/PetDetail.jsx";
import AddPetForm from "./components/AddPetForm.jsx";

function App() {
  const [view, setView] = useState("list");
  const [selectedPetId, setSelectedPetId] = useState(null);

  return (
    <div className="container">
      <h1 className="title">🐾 Petstore</h1>
      {view === "list" && (
        <PetList
          onSelectPet={(id) => {
            setSelectedPetId(id);
            setView("detail");
          }}
          onAddPet={() => setView("add")}
        />
      )}
      {view === "detail" && (
        <PetDetail
          petId={selectedPetId}
          onBack={() => setView("list")}
        />
      )}
      {view === "add" && (
        <AddPetForm
          onBack={() => setView("list")}
        />
      )}
    </div>
  );
}

export default App;