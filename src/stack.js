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
		viewBtn.setAttribute('class', 'button');
		viewBtn.setAttribute('id', `${this.id} btn`);
		viewBtn.innerText = "Check this stack out!";
		viewBtn.addEventListener("click", (e) => this.fetchCards(e));
		const title = document.createElement('h2');
		const cardsDiv = document.createElement('div');
		cardsDiv.setAttribute('class', 'cardsDiv');
		cardsDiv.setAttribute('id', `cards-${this.id}`);
		title.innerText = this.title;
		this.div.appendChild(title);
		grid.appendChild(this.div);
		this.div.appendChild(cardsDiv);
		this.div.appendChild(viewBtn);
    }
	
	sortCards(e){
		this.cards.sort((a, b) => (a.front > b.front) ? 1 : -1);
		this.cards.forEach(card => {
			card.removeAllChildNodes(card.cardDiv);
			card.display(this);
		})
	}
	
    fetchCards(e){
		fetch(BASE_URL + `stacks/${this.id}/cards`)
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
			this.renderSortBtn();
	    })
	}
	
	renderSortBtn(){
		const sortBtn = document.createElement('button');
		sortBtn.setAttribute('class', 'button');
		sortBtn.setAttribute('id', `${this.id}-sort-btn`);
		sortBtn.innerText = "Sort this stack!";
		sortBtn.addEventListener("click", (e) => this.sortCards(e));
		this.div.insertBefore(sortBtn, this.div.children[2]);
	}

    renderToggleBtn(){
		const toggleBtn = document.createElement('button');
		toggleBtn.setAttribute('id', `${this.id} btn`);
		toggleBtn.setAttribute('class', 'button');
		toggleBtn.innerText = "Hide this stack!";
		toggleBtn.addEventListener("click", (e) => {
			const cards = this.div.querySelectorAll('.card');
			const newCardForm = this.div.querySelector('form');
			const sortBtn = document.getElementById(`${this.id}-sort-btn`);
			if(newCardForm.style.display === 'grid') {
				sortBtn.style.display = 'none'
				newCardForm.style.display = 'none';
				toggleBtn.innerText = "Check this stack out!";
				cards.forEach(card => {
					card.style.display = 'none';
				})
			}else {
				sortBtn.style.display = 'block'
				newCardForm.style.display = 'grid';
				toggleBtn.innerText = "Hide this stack!";
				cards.forEach(card => {
					card.style.display = 'grid';
				})
			}
		})
		this.div.insertBefore(toggleBtn, this.div.children[1]);
    }

    renderCardForm(){
		const stackDiv = document.getElementById(`stack-${this.id}`);
		const cardForm = document.createElement('form');
		cardForm.setAttribute('id', `new-card-form-${this.id}`);
		cardForm.style.display = 'grid';
		cardForm.innerHTML = '<h3>Add a new card to this stack</h3><div><label for="front">Front of card: </label><input id="front" required/></div><div><label for="back">Back of card: </label><input id="back"  required/></div><div><input type="submit" value="Add card to stack" /></div>';
		stackDiv.appendChild(cardForm);
		cardForm.addEventListener("submit", this.createCard);
    }

    createCard = (e) => {
		e.preventDefault();
		fetch(BASE_URL + `stacks/${this.id}/cards`, {
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
    removeCardForm(){
		const cardForm = document.getElementById(`new-card-form-${this.id}`);
		cardForm.remove();
    }

}
