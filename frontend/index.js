function getStacks(){
    fetch('http://localhost:3000/stacks')
	.then(r => r.json())
	.then(data => console.log(data))
}
getStacks();
	     
