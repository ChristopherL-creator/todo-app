const BASE_URL = "https://628d3321a3fd714fd040dac4.mockapi.io/todo/";

let todosArray = [];

const responseCallBack = (response) => response.json(); 

const createToDoDate = (creationDate) => { 
    const dateDiv = document.createElement('div'); 
    dateDiv.classList.add('creation-date');
    dateDiv.appendChild(document.createTextNode(creationDate.toLocaleString())); 
    return dateDiv; 
} 

const createToDoTags = (tags) => { 
    const tagsContainer = document.createElement('div'); 
tagsContainer.classList.add('todo-tags'); 
    for (const tag of tags) {
        const span = document.createElement('span');
        span.classList.add('tags-items');
        const node = document.createTextNode(tag);
        span.appendChild(node);
        tagsContainer.appendChild(span) 
    }

    return tagsContainer; 
} 

const createToDoName = (name) => { 
    const div = document.createElement('div'); 
    div.classList.add('todo-name');
    div.appendChild(document.createTextNode(name)); 
    return div; 
} 

const createDivider = () => { 
    const divider = document.createElement('div');  
    divider.classList.add('todo-divider'); 
    // for (const todo of arrayOfToDo) {
    //     divider.style.backgroundColor = todo.priority.color;
    // }
    return divider;
} 

const filterTodos = (t1, t2) =>{
    return t1.id !== t2.id;
  }

const removeToDoAndRefresh = (todo) => {
    // stopLoading()
    todosArray = todosArray.filter(t1 => filterTodos(t1, todo))
    displayToDos(todosArray);
  }

// const deleteCallback = () => {
//     initApp();
//   }

// const deleteToDo = (id) => { 
//     const deleteUrl = BASE_URL + id; 
//     const fetchConf = { 
//         method: 'delete'
//     } 
//     fetch(deleteUrl, fetchConf) 
//     .then(responseCallBack) 
//     .then(deleteCallback); 

// } 
const deleteToDo = (id) => { 
    // startLoading();
    const deleteUrl = BASE_URL + id; 
    const fetchConf = { 
        method: 'delete'
    } 
    fetch(deleteUrl, fetchConf) 
    .then(response => response.json()) 
    .then(result => removeToDoAndRefresh(result)) 
    // .catch(error => stopLoading())

} 


const createToDoCheck = () => { 
    const check = document.createElement('button');  
    check.classList.add('done-check');
    return check; 
}  
const createToDoEdit = () => { 
    const edit = document.createElement('button');  
    edit.classList.add('edit-button');
    return edit; 
}  

const createDeleteToDoButton = (id) => { 
    const button = document.createElement('button'); 
    button.classList.add('delete-button');
    button.onclick = () => deleteToDo(id); 
    return button; 
}  

const createToDoGrid = (todo) => { 
    const toDoGrid = document.createElement('div'); 
    toDoGrid.classList.add('todo-grid'); 
    toDoGrid.appendChild(createToDoName(todo.name)); 
    toDoGrid.appendChild(createToDoTags(todo.tags)); 
    toDoGrid.appendChild(createToDoDate(todo.creationDate)); 
    toDoGrid.appendChild(createDivider());
    toDoGrid.appendChild(createDeleteToDoButton(todo.id)); 
    toDoGrid.appendChild(createToDoEdit());
    toDoGrid.appendChild(createToDoCheck());
    return toDoGrid
} 

const createToDoCard = (todo) => {
    const toDoCard = document.createElement('div'); 
    toDoCard.classList.add('todo-card'); 
    toDoCard.appendChild(createToDoGrid(todo)); 
    return toDoCard;
}

const createArrayOfToDosCard = (arrayOfToDo) => arrayOfToDo.map(todo => createToDoCard(todo)); 

const displayToDos = (arrayOfToDos) => { 

    document.body.innerHTML= ''; 

    const toDoHeader = document.createElement('header'); 
    toDoHeader.classList.add('todo-header');
    document.body.appendChild(toDoHeader);
    
    const headerSpan = document.createElement('span'); 
    headerSpan.classList.add('header-span');
    const titleNode = document.createTextNode('ToDo App'); 
    headerSpan.appendChild(titleNode); 
    toDoHeader.appendChild(headerSpan); 
    
    const updateButton = document.createElement('button'); 
    updateButton.classList.add('update-button'); 
    updateButton.onclick = () => initApp(); 
    const updateButtonNode = document.createTextNode(''); 
    updateButton.appendChild(updateButtonNode); 
    toDoHeader.appendChild(updateButton); 
    
    const arrayContainer = document.createElement('div');
    arrayContainer.classList.add('array-container');
    arrayContainer.append(...createArrayOfToDosCard(arrayOfToDos));
    document.body.appendChild(arrayContainer); 
    
    const addToDoButton = document.createElement('div'); 
    addToDoButton.classList.add('add-button');
    const addButtonNode = document.createTextNode('+'); 
    addToDoButton.appendChild(addButtonNode); 
    document.body.appendChild(addToDoButton);
}

const convertResultInArrayOfToDos = (result) => result.map(obj => ToDo.fromObj(obj)); 

const resultCallBack = (result) => displayToDos(convertResultInArrayOfToDos(result));  

const catchError = (error) => console.log(error); 

const initApp = () => 
                     fetch(BASE_URL) 
                     .then(responseCallBack) 
                     .then(resultCallBack) 
                     .catch(catchError);

initApp(); 

//___________________________________________________________________________________________

// const BASE_URL = 'https://628b2f687886bbbb37b2139d.mockapi.io/todo'; 

// const todosArray = [];  

// function goToToDoPage() {
//     window.location.href = "/todo.html";
// }

// function populateTagContainer(container,tags) {
//     for(const tag of tags) { 
//         const span = document.createElement('span'); 
//         span.classList.add('tag'); 
//         const node = document.createTextNode(tag); 
//         span.appendChild(node); 
//         container.appendChild(span);
//     }
// }

// function createToDoCard(todo){ 
    
    // const cardTemplate = ` 
    //     <span class="todo-name">#NAME</span> 
    //     <div class="tag-container"> 
    //         <span>#CREATIONDATE</span> 
    //         <div class="divider"> 
    //         <div class="buttons-container"> 
    //             <button class="delete-button><img width="20px" src="./assets/delete.svg" alt=""></button> 
    //             <button class="edit-button><img width="20px" src="./assets/delete.svg" alt=""></button> 
    //             <button class="done-button><img width="20px" src="./assets/delete.svg" alt=""></button>
    //         </div>`  

//     const toDoHtml = cardTemplate.replace('#NAME', todo.name) 
//                                  .replace('#CREATIONDATE', todo.creationDate.toLocaleString) 

//     return toDoHtml;
// }

// function startLoading() {
//     const loader = document.getElementById('loader'); 
//     loader.style.display = 'inline-block'; 
    // const refresh = document.getElementById('refresh-button'); 
    // refresh.style.display = 'none';
// } 

// function stoptLoading() {
//     const loader = document.getElementById('loader'); 
//     loader.style.display = 'none'; 
    // const refresh = document.getElementById('refresh-button'); 
    // refresh.style.display = 'inline';
// }

// function filtertoDos(t1, t2) {
//     return t1.id !== t2.id;
// } 
// //  tiene tutti i display diversi dal todo originario;

// function removeToDoAndRefresh(todo) {
//     todosArray = todosArray.filter(t1 => filtertoDos(t1, todo));
//     displayToDos(todosArray);
// } 
//  per ogni t1 nell'array, controlla che non sia uguale a t2;

// function deleteToDo(id){ 
//     startLoading()
//     const deleteUrl = BASE_URL + '/' + ID; 
//     const fetchOptions = { 
//          method: 'delete'
//     }; 
        // fetch(deleteUrl, fetchOptions) 
        // .then(response => response.json()) 
        // .then(result => removeToDoAndRefresh(result)) 
//         .catch(error => stopLoading())
// }

// function displayToDos(todos){  
    
    // const toDosContainer = document.getElementById('todos-container'); 

    // toDosContainer.innerHTML= '';
//     for (const todo of todos) {
// //  div contenitore
//         const todoCard = document.createElement('div'); 
    // toDoCard.classList.add('todo-card'); 

    // toDoCard.innerHTML = createToDoCard(todo); 

    // const tagContainer = toDoCard.querySelector('.tag-container'); 

    // populateTagContainer(tagContainer, todo.tags); 

    // const deleteButton = todoCard.querySelector('.delete-button')

    // const divider = todoCard.querySelector('.divider'); 
    // divider.style.backgroundColor = todo.priority.color;

// // //  creo span; ci metto quindi dentro node 
// //         const span = document.createElement('span'); 
// //         const nameNode = document.createTextNode(todo.name); 
// //         span.appendChild(nameNode); 
// //         todoCard.appendChild(span); 
        
// //         const button = document.createElement('button'); 
// //         button.onclick = () => deleteToDo(todo.id); 
// //  la chiamo come lambda, sennò lo esegue subito; se non dovessi 
// //  passare nessun parametro, ci tolgo le tonde, sennò la esegue subito; 
// //  devo quindi creare funzione contenitore della funzione che non devo eseguire 
// //  subito (lambda);
// //         const deleteNode = document.createTextNode('delete'); 

// //         button.appendChild(deleteNode); 
// //         todoCard.appendChild(button);
        
//         toDosContainer.appendChild(todoCard); 

//     } 

// } 

// function initToDos(todos){ 
    // stopLoading();
//     todosArray = todos.map(obj => Todo.fromDbObj(obj)); 
//     displayToDos(todosArray);
// }

// function loadToDos() { 
//     startLoading()
//     fetch(BASE_URL) 
//     .then(response => response.json) 
//     .then(result => initToDos(result))
//     .catch(error => stopLoading())
// } 

// loadToDos(); 

//  1)  usare dialFree per chiedere conferma cancellazione; 

//  2)  ordinati toDo per priorità; se doppi, il più vecchio; 

//  3)  fare bella applicazione;