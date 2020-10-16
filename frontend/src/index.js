const app = new App();
addNewStackFormListener();

function addNewStackFormListener(){
    document.querySelector("#new-stack-form").addEventListener("submit", (e) => {app.createStack(e)});
}
