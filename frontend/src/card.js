class Card{
    constructor({id, attributes: {front, back}}){
	this.front = front;
	this.back = back;
	this.id = id;
    }

    display(stack){
	const stackDiv = document.getElementById(`stack-${stack.id}`);
	const cardDiv = document.createElement('div');
	cardDiv.setAttribute('id', `${this.id}`);
	cardDiv.setAttribute('class', 'card');
	cardDiv.style.cursor = 'pointer';
	cardDiv.style.display = 'block';
	const frontCard = document.createElement('div');
	const backCard = document.createElement('div');
	const frontText = document.createElement('p');
	const backText = document.createElement('p');
	frontText.innerText = `front: ${this.front}`;
	backText.innerText = `back: ${this.back}`;
	backCard.style.fontWeight = 'bold';
	backCard.style.display = 'none';
	frontCard.appendChild(frontText);
	backCard.appendChild(backText);
	cardDiv.appendChild(frontCard);
	cardDiv.appendChild(backCard);
	cardDiv.addEventListener("click", (e) =>{
	    if(backCard.style.display === 'none'){
		backCard.style.display = 'block';
	    }else{
		backCard.style.display = 'none';
	    }
	})
	stackDiv.appendChild(cardDiv);
    }
}
