//select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

//variables
let LIST, id;

//get item from localstorage
let data = localStorage.getItem("TODO");

//check if data is not empty
if(data){
   LIST = JSON.parse(data);
   id = LIST.length; //set id to the last one in list
   loadList(LIST); //load the list to the user interface
}else {
    //if data isn't empty
    LIST = [];
    id = 0;
}

//load items
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//to clear localstorage
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
});
 
//to display date
const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHtml = today.toLocaleDateString("en-US", options);

//add to-do function
function addToDo(toDo, id, done, trash) {
    if(trash){ return; }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `<li class="item">
    <i class="far ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-alt de" job="delete" id="${id}"></i></li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position,item);
}
//add an item when enter is pressed
document.addEventListener("keyup",function(e) {
    if(e.keyCode == 13) {
       const toDo = input.value;
       //if input isn't empty
       if(toDo) {
           addToDo(toDo);
           LIST.push({
               name : toDo,
               id : id,
               done : false,
               trash : false
           });
           //add item to localstorage
           localStorage.setItem("TODO", JSON.stringify(LIST));
           id++;
       }
       input.value = "";
    }
});


//complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//target the items created dynamically
list.addEventListener("click",function(e){
    const element = e.target;
    const elementJob = element.attributes.job.value;
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    //add item to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});