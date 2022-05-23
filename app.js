const responseCallBack = (response) => response.json(); 

const createToDoDate = (name) => { 
    const div = document.createElement('div'); 
    div.classList.add('creation-date');
    div.appendChild(document.createTextNode(name)); 
    return div; 
} 

const createToDoTags = (tags) => { 
    const div = document.createElement('div'); 
    div.classList.add('todo-tags');
    div.appendChild(document.createTextNode(tags)); 
    return div; 
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

const createDeleteToDo = (id) => { 
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
    
    const menuButton = document.createElement('button'); 
    menuButton.classList.add('menu-button');
    const menuButtonNode = document.createTextNode('='); 
    menuButton.appendChild(menuButtonNode); 
    toDoHeader.appendChild(menuButton); 
    
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