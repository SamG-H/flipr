class Card{
    constructor({id, attributes: {front, back}}){
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
	const frontText = document.createElement('p');
	const backText = document.createElement('p');
	frontText.innerText = `${this.front}`;
	backText.innerText = `${this.back}`;
	backCard.style.fontWeight = 'bold';
	backCard.style.display = 'none';
	frontCard.appendChild(frontText);
	backCard.appendChild(backText);
	cardDiv.appendChild(frontCard);
	cardDiv.appendChild(backCard);
	cardDiv.addEventListener("click", (e) =>{
	    if(backCard.style.display === 'none'){
			cardDiv.classList.add('clicked');
		backCard.style.display = 'grid';
		frontCard.style.display = 'none';
	    }else{
			cardDiv.setAttribute('class', 'card');
		backCard.style.display = 'none';
		frontCard.style.display = 'grid';
	    }
	})
	cardsDiv.appendChild(cardDiv);
    }
}
