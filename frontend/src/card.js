class Card{
    constructor({id, attributes: {front, back}}) {
		this.front = front;
		this.back = back;
		this.id = id;
    }

    display(stack){
		const cardsDiv = document.getElementById(`cards-${stack.id}`);
		const cardDiv = document.createElement('div');
		cardDiv.setAttribute('id', `${this.id}`);
		cardDiv.setAttribute('class', 'card');
		cardDiv.style.cursor = 'pointer';
		cardDiv.style.display = 'grid';
		const frontCard = document.createElement('div');
		const backCard = document.createElement('div');
		frontCard.setAttribute('class', 'front-card');
		backCard.setAttribute('class', 'back-card');
		frontCard.innerText = `${this.front}`;
		backCard.innerText = `${this.back}`;
		backCard.style.fontWeight = 'bold';
		backCard.style.display = 'none';
		cardDiv.appendChild(frontCard);
		cardDiv.appendChild(backCard);
		cardDiv.addEventListener("click", (e) =>{
			cardDiv.classList.toggle('clicked');
			if(backCard.style.display === 'none') {
				backCard.style.display = 'grid';
				frontCard.style.display = 'none';
			}else {
				cardDiv.setAttribute('class', 'card');
				backCard.style.display = 'none';
				frontCard.style.display = 'grid';
			}
	})
		cardsDiv.appendChild(cardDiv);
    }
}
