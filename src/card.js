class Card {
  constructor({ id, attributes: { front, back } }) {
    this.front = front;
    this.back = back;
    this.id = id;
    this.cardDiv = document.createElement("div");
    this.cardDiv.setAttribute("id", `${this.id}`);
    this.cardDiv.setAttribute("class", "card");
    this.cardDiv.style.display = "grid";
    this.frontCard = document.createElement("div");
    this.backCard = document.createElement("div");
    this.cardDiv.addEventListener("click", (e) => this.flip(e));
    this.frontCard.setAttribute("class", "front-card");
    this.backCard.setAttribute("class", "back-card");
    this.frontCard.innerText = `${this.front}`;
    this.backCard.innerText = `${this.back}`;
    this.backCard.style.fontWeight = "bold";
    this.backCard.style.display = "none";
  }

  display(stack) {
    const cardsDiv = document.getElementById(`cards-${stack.id}`);
    this.cardDiv.appendChild(this.frontCard);
    this.cardDiv.appendChild(this.backCard);
    cardsDiv.appendChild(this.cardDiv);
  }

  flip(e) {
    this.cardDiv.classList.toggle("clicked");
    if (this.backCard.style.display === "none") {
      this.backCard.style.display = "grid";
      this.frontCard.style.display = "none";
    } else {
      this.cardDiv.setAttribute("class", "card");
      this.backCard.style.display = "none";
      this.frontCard.style.display = "grid";
    }
  }

  removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}
