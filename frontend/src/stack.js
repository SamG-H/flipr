class Stack {
    constructor({id, attributes: {title}}){
	this.id = id;
	this.title = title;
	this.cards = [];
	this.div = document.createElement('div');
	this.div.setAttribute('id', `stack-${this.id}`);
	this.div.setAttribute('class', 'stack');
    }
    
    display(){
	const grid = document.querySelector("#stacks");
	const viewBtn = document.createElement('button');
	viewBtn.setAttribute('class', 'stack-button');
	viewBtn.setAttribute('id', `${this.id} btn`);
	viewBtn.innerText = "Check this stack out!";
	viewBtn.addEventListener("click", (e) => this.fetchCards(e));
	const title = document.createElement('h2');
	title.innerText = this.title;
	this.div.appendChild(title);
	grid.appendChild(this.div);
	this.div.appendChild(viewBtn);
    }

    fetchCards(e){
	fetch(`http://localhost:3000/stacks/${this.id}/cards`)
	    .then(r => r.json())
	    .then(info => {
		this.addCards(info);
		this.cards.forEach((card) => {
		    card.display(this);
		})
		const viewBtn = document.getElementById(`${this.id} btn`);
		viewBtn.remove();
		this.renderCardForm();
		this.renderToggleBtn();
	    })
    }
    
    renderToggleBtn(){
	const toggleBtn = document.createElement('button');
	toggleBtn.setAttribute('id', `${this.id} btn`);
	toggleBtn.innerText = "Hide this stack!";
	toggleBtn.addEventListener("click", (e) => {
	    const cards = this.div.querySelectorAll('.card');
	    const newCardForm = this.div.querySelector('form');
	    if(newCardForm.style.display === 'block'){
		newCardForm.style.display = 'none';
		cards.forEach(card => {
		    toggleBtn.innerText = "Check this stack out!";
		    card.style.display = 'none';
		})
	    }else {
		newCardForm.style.display = 'block';
		cards.forEach(card => {
		    toggleBtn.innerText = "Hide this stack!";
		    card.style.display = 'block';
		})
	    }
	})
	this.div.insertBefore(toggleBtn, this.div.children[1]);
    }

    renderCardForm(){
	const stackDiv = document.getElementById(`stack-${this.id}`);
	const cardForm = document.createElement('form');
	cardForm.setAttribute('id', `new-card-form-${this.id}`);
	cardForm.style.display = 'block';
	cardForm.innerHTML = '<h3>Add a new card to this stack</h3><div><label for="front">Front of card: </label><input id="front" required/></div><div><label for="back">Back of card: </label><input id="back"  required/></div><div><input type="submit" value="Add card to stack" /></div>';
	stackDiv.appendChild(cardForm);
	cardForm.addEventListener("submit", (e) => {this.createCard(e)});
    }

    createCard(e){
	e.preventDefault();
	fetch(`http://localhost:3000/stacks/${this.id}/cards`, {
	    method: "POST",
	    headers: {
		"Content-Type": "application/json",
		Accept: "application/json"
	    },
	    body: JSON.stringify({
		"front": e.target.front.value,
		"back": e.target.back.value,
		"stack_id": this.id
	    })
	})
	    .then( (response) => response.json())
	    .then( (info) => {
		if(info.data.id){
		    this.addCard(info.data).display(this);
		    this.removeCardForm();
		    this.renderCardForm();
		} else{
		    alert('You need a front and back on new cards!');
		}
	    })
    }

    removeCardForm(){
	const cardForm = document.getElementById(`new-card-form-${this.id}`);
	cardForm.remove();
    }


    addCard(cardInfo){
	const card = new Card(cardInfo);
	this.cards.push(card);
	return card;
    }

    addCards(info){
	info.data.forEach((card) => {
	    this.addCard(card);
	})
    }
}
