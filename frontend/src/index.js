const app = new App();
addNewStackFormListener();

function addNewStackFormListener(){
    const newStackForm = document.querySelector("#new-stack-form");
    newStackForm.addEventListener("submit", (e) => {app.createStack(e)});
}
