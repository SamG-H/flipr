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
		cardDiv.style.display = 'block';
		const front = document.createElement('p');
		const back = document.createElement('p');
		front.innerText = `front: ${this.front}`;
		back.innerText = `back: ${this.back}`;
		back.style.fontWeight = 'bold';
		back.style.display = 'none';
		cardDiv.appendChild(front);
		cardDiv.appendChild(back);
		cardDiv.addEventListener("click", (e) =>{
			if(back.style.display === 'none'){
			back.style.display = 'block';
			}else{
			back.style.display = 'none';
			}
		})
		stackDiv.appendChild(cardDiv);
	}
}
