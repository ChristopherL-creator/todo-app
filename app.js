const responseCallBack = (response) => response.json(); 

const toDoContainer = document.createElement('div'); 
toDoContainer.classList.add('todo-container'); 


const toDoHeader = document.createElement('header'); 
toDoHeader.classList.add('todo-header'); 

function displayHeader(){ 
    //const toDoListContainer = document.getElementById('todo-list-container'); 
    const toDoHeaderTitle = document.getElementById('todo-header-id'); 
    const headerH1 = document.createElement('h2'); 
    headerH1.classList.add('header-h1');
    const titleNode = document.createTextNode('ToDo App'); 
    headerH1.appendChild(titleNode); 
    toDoHeaderTitle.appendChild(headerH1); 
} 

const deleteCallback = () => {
    initApp();
  }

const createDeleteToDo = (id) => { 
    const deleteUrl = "https://628b2f687886bbbb37b2139d.mockapi.io/todo/" + id; 
    const fetchConf = { 
        method: 'delete'
    } 
    fetch(deleteUrl, fetchConf) 
                     .then(responseCallBack) 
                     .then(deleteCallBack); 

} 

const createDeleteToDoButton = (id) => { 
    const button = document.createElement('button'); 
    button.classList.add('material-symbols-outlined');
    button.onclick = () => deleteToDo(id); 
    const node = document.images('img'); 
    button.appendChild(node); 
    return button; 
} 

const createToDoCard = (todo) => {
    const toDoCard = document.createElement('div'); 
    toDoCard.classList.add('todo-card'); 
    toDoCard.appendChild(createToDoName(todo.name)); 
    toDoCard.appendChild(createToDoTags(todo.tags)); 
    toDoCard.appendChild(createToDoDate(todo.creationDate)); 
    toDoCard.appendChild(createDeleteToDoButton(todo.id)); 
    toDoCard.appendChild(createToDoCheck(todo.id)); 
    return toDoCard;
}

displayHeader();

const createArrayOfToDoCards = (arrayOfToDo) => arrayOfToDo.map(todo => createToDoCard(todo)); 

const displayToDos = (createToDos) => { 

    document.body.innerHTML = ''; 

    const toDoListContainer = document.getElementById('todo-list-container'); 
    toDoListContainer.append(...createArrayOfToDoCards(arrayOfToDos)); 
    document.body.appendChild(toDoListContainer);

    // for (let i = 0; i < toDoList.length; i++) {
    //     const todo = toDoList[i]; 
    //     const div = document.createElement('div'); 
        
    //     const toDoTemplate = template.replace('#TODONAME', todo.name) 
    //                                  .replace('#CREATIONDATE', todo.creationDate.toISOString()); 
                
    //     div.innerHTML = toDoTemplate; 
    //     toDoListContainer.appendChild(div); 

    //     const toDoContainer = div.querySelector('.task-div'); 
    //     toDoContainer.style.backgroundColor = todo.priority.color;

    //     if (todo.deadLine) {
    //         const dateContainer = div.querySelector('.creation-container');
    //         const dateSpan = document.createElement('div'); 
    //         dateSpan.classList.add('dates')
    //         const dateNode = document.createTextNode(todo.deadLine.toISOString()); 
    //         dateSpan.appendChild(dateNode); 
    //         dateContainer.appendChild(dateSpan);
    //     } 

    //     const tagContainer = div.querySelector('.task-flex');
    //     for (const tag of todo.tags) {
    //         const tagSpan = document.createElement('span'); 
    //         const node = document.createTextNode(tag); 
    //         tagSpan.classList.add('tags-items')
    //         tagSpan.appendChild(node); 
    //         tagContainer.appendChild(tagSpan);
    //     }
    // }
} 

displayToDos(); 



const convertResultInArrayOfToDos = (result) => result.map(obj => ToDo.fromObj(obj)); 

const resultCallBack = (result) => displayToDos(convertResultInArrayOfToDos(result));  

const catchError = (error) => console.log(error); 

//  risultato di fetch è "Promise"; quindi risposta server, e in caso, risultato chiamata;
const initApp = () => fetch("https://628b2f687886bbbb37b2139d.mockapi.io/todo") 
                     .then(responseCallBack) 
                     .then(resultCallBack) 
                     .catch(catchError);

initApp();