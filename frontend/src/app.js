class App {
    constructor() {
	this.stacks = {};
	fetch('http://localhost:3000/stacks')
	    .then(r => r.json())
	    .then(stacks => {
		this.addStacks(stacks);
	    })
    }

    addStacks(stacks){
	stacks.forEach((stack) => {
	    this.addStack(stack);
	})
    }

    addStack(stack){
	this.stacks[stack.id] = new Stack(stack);
    }
}
