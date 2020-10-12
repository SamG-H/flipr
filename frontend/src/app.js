class App {
    constructor() {
	this.stacks = [];
	fetch('http://localhost:3000/stacks')
	    .then(r => r.json())
	    .then(info => {
			this.addStacks(info);
	    })
    }

    addStacks(info){
	info.data.forEach((stack) => {
	    this.addStack(stack);
	})
	this.displayStacks();
    }

    addStack(stack){
		return this.stacks[stack.id] = new Stack(stack);
    }

    displayStacks(){
		this.stacks.forEach((stack) => {
	   		stack.display();
		})
    }

    createStack(e){
	e.preventDefault();
	fetch('http://localhost:3000/stacks', {
	    method: "POST",
	    headers:
	    {
		"Content-Type": "application/json",
		Accept: "application/json"
	    },
	    body: JSON.stringify({
		"title": e.target.title.value
	    })
	})
	    .then( (response) => response.json())
	    .then( (info) => {
		if(info.data.id){
			this.addStack(info.data).display();
			e.target.reset();
		} else{
			alert('Your stack needs a title!');
		}
	    })
    }

}
