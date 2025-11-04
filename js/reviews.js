console.log("Reviews script loaded.");

const reviewsList = document.getElementById("reviews-list");
const saveButton = document.getElementById("save-review");

saveButton.addEventListener("click", () => {
  const itemId = document.getElementById("item-id").value;
  const text = document.getElementById("review-text").value;
  
  if (!itemId || !text) {
    alert("Please fill out all fields.");
    return;
  }

  const review = document.createElement("div");
  review.classList.add("review");
  review.innerHTML = `<strong>${itemId}</strong><p>${text}</p>`;
  reviewsList.appendChild(review);

  document.getElementById("item-id").value = "";
  document.getElementById("review-text").value = "";
});
