const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

export async function getPets() {
  try {
    const res = await fetch(`${BASE_URL}/pets`);
    if (!res.ok) throw new Error("Failed to fetch pets");
    return await res.json();
  } catch (error) {
    console.error("Error in getPets:", error);
    throw error;
  }
}

export async function getPet(petId) {
  try {
    const res = await fetch(`${BASE_URL}/pets/${petId}`);
    if (!res.ok) throw new Error("Pet not found");
    return await res.json();
  } catch (error) {
    console.error("Error in getPet:", error);
    throw error;
  }
}

export async function addPet(pet) {
  try {
    const res = await fetch(`${BASE_URL}/pets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pet),
    });
    if (!res.ok) throw new Error("Failed to add pet");
    return await res.json();
  } catch (error) {
    console.error("Error in addPet:", error);
    throw error;
  }
}
// Send frontend error logs to backend
export async function logFrontendError(error) {
  try {
    await fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error }),
    });
  } catch (e) {
    // fail silently
  }
}