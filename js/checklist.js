import { loadCSV } from "./main.js";

console.log("Checklist script loaded.");

function renderChecklist(cards) {
  const container = document.getElementById("checklist");
  container.innerHTML = "";

  // Load owned cards from localStorage
  const owned = JSON.parse(localStorage.getItem("ownedCards") || "{}");

  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card-item";
    div.innerHTML = `
      <img src="../${card.image_url}" alt="${card.name}">
      <div class="info">
        <strong>${card.name}</strong><br>
        <small>${card.rarity} | ${card.type}</small>
      </div>
      <input type="checkbox" id="${card.id}" ${owned[card.id] ? "checked" : ""}>
    `;
    container.appendChild(div);
  });

  // Save changes to localStorage
  container.addEventListener("change", e => {
    if (e.target.type === "checkbox") {
      owned[e.target.id] = e.target.checked;
      localStorage.setItem("ownedCards", JSON.stringify(owned));
    }
  });
}

// Load the CSV from new relative path
loadCSV("../data/cards/pokemon_lost_origin.csv").then(renderChecklist);
