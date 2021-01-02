class App {
  constructor() {
		this.stacks = [];
		this.getStacks();
	}
	
	getStacks() {
		fetch(BASE_URL + 'stacks')
		.then(r => r.json())
		.then(info => {
			this.addStacks(info);
		})
	}

	addNewStackFormListener() {
		document.querySelector("#new-stack-form").addEventListener("submit", (e) => this.createStack(e));
	}

	addStacks(info) {
		info.data.forEach((stack) => {
			this.addStack(stack);
		})
		this.displayStacks();
	}

	addStack(stack) {
		return this.stacks[stack.id] = new Stack(stack);
	}

	displayStacks() {
		this.stacks.forEach((stack) => {
			stack.display();
		})
	}

  createStack(e) {
		e.preventDefault();
		fetch(BASE_URL + 'stacks', {
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
