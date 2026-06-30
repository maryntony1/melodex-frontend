const API = "https://melodex-backend.onrender.com";

export async function getSong(id) {
  const res = await fetch(`${API}/get_song?id=${id}`);
  if (!res.ok) throw new Error("Failed to load song");
  return res.json();
}
