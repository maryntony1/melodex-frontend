const API = "https://melodex-backend.onrender.com";

export async function getChord(name) {
  const res = await fetch(`${API}/chord?name=${name}`);
  if (!res.ok) throw new Error("Chord not found");
  return res.json();
}
