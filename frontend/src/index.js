const app = new App();
addNewStackFromListener();

function addNewStackFromListener(){
    const newStackForm = document.querySelector("#new-stack-form");
    newStackForm.addEventListener("submit", (e) => {app.createStack(e)});
}
