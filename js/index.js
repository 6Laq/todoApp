const dateElement = document.getElementById('date');
const clear = document.querySelector('.clear')
const todoList = document.querySelector('.list');
const input = document.getElementById('input');


let today = new Date();
// shows todays date
let options = { weekday:'long', month:'short', day:'numeric'};
dateElement.innerHTML = today.toLocaleDateString('en-US', options);

// classes name
const check = 'fa-check-circle';
const unCheck = 'fa-circle-thin';
const lineThrough = 'lineThrough';

// variables
let List = [];
let id = 0;

// get item from local storage
let data = localStorage.getItem('TODO');
if (data){
    List = JSON.parse(data);
    id = List.length;
    loadList(List);
} else { // if data isn't empty
    List = [];
    id = 0;
}

// load items to the list

function loadList(array) {
    array.forEach(item => {
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

clear.addEventListener('click',function(){
    localStorage.clear();
    location.reload();
})

// add to do 
function addToDo(toDo, id, done, trash) {

    if (trash){return}
    const doneIconClass = done ? check : unCheck;
    const doneTextClass = done ? lineThrough : '';
    const text = `<li class="item">
                    <i class="fa ${doneIconClass} co" job="complete" id='0'></i>
                    <span class="text ${doneTextClass}">${toDo}</span>
                    <i class="fa fa-trash-o de" job = "delete" id='0'></i>
                  </li>`
    // const position = "beforeend";
    // list.insertAdjacentHTML(position, text);
    let todoElement = document.createElement('div');
    todoElement.innerHTML = text;
    todoElement.addEventListener('click',(event) => {
      // const element = event.target;
      // const elementJob = element.attributes.job.value;
      // if(elementJob == 'complete'){
      //     completeToDo(element);
      // } else if(elementJob == 'delete'){
      //     removeToDo(element);
      // }
      // localStorage.setItem('TODO', JSON.stringify(List));
  });
  todoList.appendChild(todoElement);
};  
 
// adds item to list after enter key
document.addEventListener('keypress',(event) => { 
  console.log(event.key)
  if(event.key === 'Enter') {
    console.log(input)
    const toDo = input.value;
    if(toDo){// if inout isn't empty
      addToDo(toDo, id, false, false);
      List.push({
        name : toDo,
        id : id,
        done : false,
        trash : false
      });
      localStorage.setItem('TODO', JSON.stringify(List));
      id++;
    }
  }
});

// add to do
function completeToDo(element){ 
    element.classList.toggle(check);
    element.classList.toggle(unCheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    List[element.id].done = List[element.id].done ? false : true;
};


// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    List[element.id].trash = true;
}


todoList.addEventListener('click',(event) => {
   let element = event.target;
   const elementJob = event.target.attributes.job.value;
   if(elementJob === 'complete'){
       completeToDo(element);
   } else if(elementJob === 'delete') {
       removeToDo(element);
   }
});