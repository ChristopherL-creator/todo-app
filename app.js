const responseCallBack = (response) => response.json(); 

const createToDoDate = (name) => { 
    const div = document.createElement('div'); 
    div.classList.add('creation-date');
    div.appendChild(document.createTextNode(name)); 
    return div; 
} 

const createToDoTags = (tags) => { 
    const tagsContainer = document.createElement('div'); 
    tagsContainer.classList.add('todo-tags'); 

    const tag = document.createElement('div'); 
    tag.classList.add('tags-items');
    tag.appendChild(document.createTextNode(tags)); 
    tagsContainer.appendChild(tag);  
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
    return divider;
}

const deleteCallback = () => {
    initApp();
  }

const deleteToDo = (id) => { 
    const deleteUrl = "https://628b2f687886bbbb37b2139d.mockapi.io/todo/" + id; 
    const fetchConf = { 
        method: 'delete'
    } 
    fetch(deleteUrl, fetchConf) 
    .then(responseCallBack) 
    .then(deleteCallback); 

} 

const createToDoCheck = () => { 
    const check = document.createElement('input');  
    check.setAttribute("type", "checkbox");
    check.classList.add('done-check');
    return check; 
}  

const createDeleteToDoButton = (id) => { 
    const button = document.createElement('button'); 
    button.classList.add('delete-button');
    button.classList.add('material-symbols-outlined');
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
    
    const headerH1 = document.createElement('h2'); 
    headerH1.classList.add('header-h2');
    const titleNode = document.createTextNode('ToDo App'); 
    headerH1.appendChild(titleNode); 
    toDoHeader.appendChild(headerH1); 
    
    const updateButton = document.createElement('button'); 
    updateButton.classList.add('update-button'); 
    updateButton.onclick = () => initApp(); 
    const updateButtonNode = document.createTextNode('Update'); 
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

const initApp = () => fetch("https://628b2f687886bbbb37b2139d.mockapi.io/todo") 
                     .then(responseCallBack) 
                     .then(resultCallBack) 
                     .catch(catchError);

initApp(); 

//___________________________________________________________________________________________

// const BASE_URL = 'https://628b2f687886bbbb37b2139d.mockapi.io/todo'; 

// const todosArray = [];  

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
// //  creo span; ci metto quindi dentro node 
//         const span = document.createElement('span'); 
//         const nameNode = document.createTextNode(todo.name); 
//         span.appendChild(nameNode); 
//         todoCard.appendChild(span); 
        
//         const button = document.createElement('button'); 
//         button.onclick = () => deleteToDo(todo.id); 
//  la chiamo come lambda, sennò lo esegue subito; se non dovessi 
//  passare nessun parametro, ci tolgo le tonde, sennò la esegue subito; 
//  devo quindi creare funzione contenitore della funzione che non devo eseguire 
//  subito (lambda);
//         const deleteNode = document.createTextNode('delete'); 

//         button.appendChild(deleteNode); 
//         todoCard.appendChild(button);
        
//         toDosContainer.appendChild(todoCard); 

//     } 

// } 

// function initToDos(todos){ 
//     todosArray = todos; 
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