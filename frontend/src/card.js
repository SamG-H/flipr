class Card{
    constructor({id, attributes: {front, back}}){
	this.front = front;
	this.back = back;
	this.id = id;
    }

    display(stack){
	const cardDiv = document.getElementById(`${stack.id}`);
	const stackBtn = document.getElementById(`${stack.id} btn`);
	if(stackBtn){
	    stackBtn.remove();
	}
	//stackBtn.innerText = "Hide this stack"; maybe change eventListener on this button instead of removing
	const front = document.createElement('p');
	const back = document.createElement('p');
	const nextBtn = document.createElement('button');
	const prevBtn = document.createElement('button');
	nextBtn.innerText = "->";
	prevBtn.innerText = "<-";
	prevBtn.addEventListener("click", (e) => stack.renderPreviousCard);
	nextBtn.addEventListener("click", (e) => stack.renderNextCard);
	front.innerText = `front: ${this.front}`;
	back.innerText = `back: ${this.back}`;
	cardDiv.appendChild(front);
	cardDiv.appendChild(back);
	cardDiv.appendChild(prevBtn);
	cardDiv.appendChild(nextBtn);
    }
}
