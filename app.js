const API = "https://melodex-backend.onrender.com";
document.getElementById("loadSongBtn").addEventListener("click", async () => {
  const response = await fetch(`${API}/song`);
  const data = await response.json();

  document.getElementById("lyrics").innerText = data.lyrics;
});
