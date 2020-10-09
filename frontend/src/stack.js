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
	stackDiv.setAttribute('id', `stack-${this.id}`);
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
		this.cards.forEach((card) => {
		    card.display(this);
		})
	    })
    }

    addCard(card){
	this.cards.push(new Card(card));
    }

    addCards(info){
	info.data.forEach((card) => {
	    this.addCard(card);
	})
			   
	//this.cards[0].display(this);
	//this.addBtns(this.cards[0].id);
    }

/*    addBtns(currentCardId){
	const cardDiv = document.getElementById(`${currentCardId}`);
	const nextBtn = document.createElement('button');
	const prevBtn = document.createElement('button');
	nextBtn.innerText = "->";
	prevBtn.innerText = "<-";
	prevBtn.addEventListener("click", (e) => {this.renderPreviousCard(e)});
	nextBtn.addEventListener("click", (e) => {this.renderNextCard(e)});
	cardDiv.appendChild(prevBtn);
	cardDiv.appendChild(nextBtn);
    }
    
    renderNextCard(e){
	const prevCardId = parseInt(e.target.parentElement.id);
	e.target.parentElement.remove();
	let newCardId = prevCardId + 1;
	this.cards[newCardId].display(this);
	this.addBtns(newCardId);
    }

    renderPreviousCard(e){
	let prevCardId = parseInt(e.target.parentElement.id);
	e.target.parentElement.remove();
	let newCardId = prevCardId - 1;
	this.cards[newCardId].display(this);
	this.addBtns(newCardId);
    }*/
}
