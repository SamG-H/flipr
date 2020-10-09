class Card{
    constructor({id, attributes: {front, back}}){
	this.front = front;
	this.back = back;
	this.id = id;
    }

    display(stack){
	const stackDiv = document.getElementById(`stack-${stack.id}`);
	const stackBtn = document.getElementById(`${stack.id} btn`);
	if(stackBtn){
	    stackBtn.remove();
	}
	//stackBtn.innerText = "Hide this stack"; maybe change eventListener on this button instead of removing
	const cardDiv = document.createElement('div');
	cardDiv.setAttribute('id', `${this.id}`);
	const front = document.createElement('p');
	const back = document.createElement('p');
	front.innerText = `front: ${this.front}`;
	back.innerText = `back: ${this.back}`;
	cardDiv.appendChild(front);
	cardDiv.appendChild(back);
	stackDiv.appendChild(cardDiv);
    }
}
