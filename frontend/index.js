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

function renderStack(stack){
    const grid = document.querySelector(".content");
    const stackDiv = document.createElement('div');
    const viewBtn = document.createElement('button');
    viewBtn.innerText = "Check this stack out!";
    stackDiv.className = `${stack.id}`;
    viewBtn.addEventListener("click", renderCard);
    const title = document.createElement('h2');
    title.innerText = stack.title;
    stackDiv.appendChild(title);
    grid.appendChild(stackDiv);
    stackDiv.appendChild(viewBtn);
}

function getCards(e){
    console.log(e);
    const grid = document.querySelector(".content");
    removeAllChildNodes(grid);
    renderStack(stacks[3]);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
