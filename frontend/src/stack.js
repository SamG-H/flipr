class Stack {
    constructor({id, attributes: {title}}){
	this.id = id;
	this.title = title
	this.cards = [];
    }

    display(){
	const grid = document.querySelector("#stacks");
	const stackDiv = document.createElement('div');
	const viewBtn = document.createElement('button');
	viewBtn.setAttribute('id', `${this.id} btn`);
	viewBtn.innerText = "Check this stack out!";
	stackDiv.setAttribute('id', `${this.id}`);
	viewBtn.addEventListener("click", (e) => this.fetchCards(e));
	const title = document.createElement('h2');
	title.innerText = this.title;
	stackDiv.appendChild(title);
	grid.appendChild(stackDiv);
	stackDiv.appendChild(viewBtn);
    }

    fetchCards(e){
	fetch(`http://localhost:3000/stacks/${this.id}/cards`)
	    .then(r => r.json())
	    .then(info => {
		this.addCards(info);
	    })
    }
    
    addCards(info){
	info.data.forEach((card) => {
	   this.addCard(card);
	})
	//this.displayCard();
    }

    addCard(card){
	this.cards[card.id] = new Card(card);
    }


    displayCard(){
	
    }
}
