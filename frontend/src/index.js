const app = new App();

renderHome();

function renderCardForm(stackId){
    const stackDiv = document.getElementById(`${stackId}`);
    const cardForm = document.createElement('form');
    cardForm.innerHTML = '<h3>Add a new card to this stack</h3><div><label for="front">Front of card: </label><input id="front" /></div><div><label for="back">Back of card: </label><input id="back" /></div><div><input type="submit" value="Add card to stack" /></div>';
    cardForm.addEventListener("submit", createCard);
    stackDiv.appendChild(cardForm);
}

function renderIntro(){
    const introDiv = document.querySelector("#flipr-intro");
    const introPara = document.createElement("p");
    introPara.innerText = "flipr is a collection of flashcard stacks created by fliprs like you. Go ahead and checkout a stack of flashcards if the title peeks your interest or create your own stack!";
    introDiv.appendChild(introPara);
}

function renderStackForm(){
    const contentDiv = document.querySelector("#new-stack-form");
    const newStackForm = document.createElement("form");
    newStackForm.setAttribute('id', 'new-stack');
    newStackForm.innerHTML = '<h2>Create a new stack of flash cards</h2><div><label for="title">Title: </label><input id="title"></div><div><input type="submit" value="Create new stack"></div>';
    newStackForm.addEventListener("submit", createStack);
    contentDiv.appendChild(newStackForm);
}

function renderHome(){
    clearScreen();
    renderIntro();
    getStacks();
}

document.addEventListener("DOMContentLoaded", () => {
    const home = document.querySelector("#home");
    home.addEventListener("click", () => {
	renderHome();
    })
})


function clearScreen(){
    removeAllChildNodes(document.querySelector("#stacks"));
    removeAllChildNodes(document.querySelector("#flipr-intro"));
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getStacks(){
    fetch('http://localhost:3000/stacks')
	.then(r => r.json())
	.then(stacks => {
	    renderStacks(stacks);
	})
}

function renderStacks(stacks){
    stacks.forEach(stack => {
	renderStack(stack);
    })
    renderStackForm();
}

function renderStack(stack){
    const grid = document.querySelector("#stacks");
    const stackDiv = document.createElement('div');
    const viewBtn = document.createElement('button');
    viewBtn.setAttribute('id', `${stack.id} btn`);
    viewBtn.innerText = "Check this stack out!";
    stackDiv.setAttribute('id', `${stack.id}`);
    viewBtn.addEventListener("click", getCards);
    const title = document.createElement('h2');
    title.innerText = stack.title;
    stackDiv.appendChild(title);
    grid.appendChild(stackDiv);
    stackDiv.appendChild(viewBtn);
}

function createStack(e){
    e.preventDefault();
    fetch('http://localhost:3000/stacks', {
	method: "POST",
	headers: 
	{
	    "Content-Type": "application/json",
	    Accept: "application/json"
	},
	
	body: JSON.stringify({
	    "title": title.value
	})
    })
	.then( (response) => response.json())
	.then( (stack) => {
	    if(stack.title){
		renderStack(stack);
	    }
	    e.target.reset();
	})
}


function renderNextCard(e){

}

function renderPreviousCard(e){

}

function createCard(e){
    e.preventDefault();
    fetch('http://localhost:3000/cards', {
	method: "POST",
	headers: 
	{
	    "Content-Type": "application/json",
	    Accept: "application/json"
	},
	
	body: JSON.stringify({
	    "front": front.value,
	    "back": back.value,
	    "stack_id": e.target.parentElement.id
	})
    })
	.then( (response) => response.json())
	.then( (card) => {
	    if(card.front){
		renderCard(card);
	    }
	    e.target.reset();
	})

}

function renderCards(cards){
    cards.forEach(card => {
	renderCard(card);
    })
}
function renderCard(card){
    const grid = document.querySelector("#stacks");
    const cardDiv = document.getElementById(`${card.stack_id}`);
    const stackBtn = document.getElementById(`${card.stack_id} btn`);
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
    prevBtn.addEventListener("click", renderPreviousCard);
    nextBtn.addEventListener("click", renderNextCard);
    front.innerText = `front: ${card.front}`;
    back.innerText = `back: ${card.back}`;
    cardDiv.appendChild(front);
    cardDiv.appendChild(back);
    cardDiv.appendChild(prevBtn);
    cardDiv.appendChild(nextBtn);
    grid.prepend(cardDiv);
}
    

function getCards(e){
    const stackId = e.target.parentElement.id;
    fetch(`http://localhost:3000/stacks/${stackId}`)
	.then(r => r.json())
	.then(cards => {
	    renderCards(cards);
	    renderCardForm(stackId);
	})
}
