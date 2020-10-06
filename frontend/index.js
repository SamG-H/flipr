function getStacks(){
    fetch('http://localhost:3000/stacks')
	.then(r => r.json())
	.then(data => {
	    renderStacks(data);
	})
}
getStacks();

function renderStacks(stacks){
    stacks.forEach(stack => {
	renderStack(stack);
    })
}

function renderNextCard(e){

}

function renderPreviousCard(e){

}

function addCard(e){
    clearScreen();
    const grid = document.querySelector(".content");
    const cardForm = document.createElement('form');
    cardForm.innerHTML = '<div><label for="front">Front: </label><input id="front" /></div><div><label for="back">Back: </label><input id="back" /></div><div><input type="submit" value="Add card to stack" /></div>';
    grid.appendChild(cardForm);
}

function renderCard(card){
    const grid = document.querySelector(".content");
    const cardDiv = document.createElement('div');
    const stack = document.createElement('h2');
    const front = document.createElement('p');
    const back = document.createElement('p');
    const nextBtn = document.createElement('button');
    const prevBtn = document.createElement('button');
    nextBtn.innerText = "->";
    prevBtn.innerText = "<-";
    prevBtn.addEventListener("click", renderPreviousCard);
    nextBtn.addEventListener("click", renderNextCard);
    stack.innerText = `${card.stack.title}`;
    stack.addEventListener("click", addCard);
    front.innerText = `front: ${card.front}`;
    back.innerText = `back: ${card.back}`;
    cardDiv.appendChild(stack);
    cardDiv.appendChild(front);
    cardDiv.appendChild(back);
    cardDiv.appendChild(prevBtn);
    cardDiv.appendChild(nextBtn);
    grid.appendChild(cardDiv);
}

function renderStack(stack){
    const grid = document.querySelector(".content");
    const stackDiv = document.createElement('div');
    const viewBtn = document.createElement('button');
    viewBtn.innerText = "Check this stack out!";
    stackDiv.className = `${stack.id}`;
    viewBtn.addEventListener("click", getCard);
    const title = document.createElement('h2');
    title.innerText = stack.title;
    stackDiv.appendChild(title);
    grid.appendChild(stackDiv);
    stackDiv.appendChild(viewBtn);
}

function getCard(e){
    clearScreen();
    fetch('http://localhost:3000/cards/1')
	.then(r => r.json())
	.then(data => {
	    renderCard(data);
	})

}

function clearScreen(){
    removeAllChildNodes(document.querySelector(".content"));
    removeAllChildNodes(document.querySelector("#flipr-intro"));
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

