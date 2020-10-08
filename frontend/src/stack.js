class Stack {
    constructor({id, attributes: {title}}){
	this.id = id;
	this.title = title
    }

    display(){
	const grid = document.querySelector("#stacks");
	const stackDiv = document.createElement('div');
	const viewBtn = document.createElement('button');
	viewBtn.setAttribute('id', `${this.id} btn`);
	viewBtn.innerText = "Check this stack out!";
	stackDiv.setAttribute('id', `${this.id}`);
	viewBtn.addEventListener("click", app.getCards);
	const title = document.createElement('h2');
	title.innerText = this.title;
	stackDiv.appendChild(title);
	grid.appendChild(stackDiv);
	stackDiv.appendChild(viewBtn);
    }
}
