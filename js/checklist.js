async function loadCSV(path) {
  const response = await fetch(path);
  const text = await response.text();
  const [headerLine, ...lines] = text.trim().split("\n");
  const headers = headerLine.split(",");

  return lines.map(line => {
    const values = line.split(",");
    return Object.fromEntries(headers.map((h, i) => [h, values[i]]));
  });
}

function renderChecklist(cards) {
  const container = document.getElementById("checklist");
  container.innerHTML = "";

  const owned = JSON.parse(localStorage.getItem("ownedCards") || "{}");

  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card-item";
    div.innerHTML = `
      <img src="${card.image_url}" alt="${card.name}">
      <div class="info">
        <strong>${card.name}</strong><br>
        <small>${card.rarity} ? ${card.type}</small>
      </div>
      <input type="checkbox" id="${card.id}" ${owned[card.id] ? "checked" : ""}>
    `;
    container.appendChild(div);
  });

  container.addEventListener("change", e => {
    if (e.target.type === "checkbox") {
      owned[e.target.id] = e.target.checked;
      localStorage.setItem("ownedCards", JSON.stringify(owned));
    }
  });
}

loadCSV("data/cards/pokemon_lost_origin.csv").then(renderChecklist);
