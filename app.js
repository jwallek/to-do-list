//selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");



//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);


document.querySelector(".btn-1").addEventListener("click", () =>{
    document.body.style.backgroundImage = "url('background.jpg')";
    document.body.style.color = "white";
    
});
document.querySelector(".btn-2").addEventListener("click", () =>{
    document.body.style.backgroundImage = "url('background-1.jpg')";
    document.body.style.color = "white";
});
document.querySelector(".btn-3").addEventListener("click", () =>{
    document.body.style.backgroundImage = "url('background-2.jpg')";
    document.body.style.color = "black";
});
    


//functions
function addTodo(event){
    //prevent from submitting by default
    event.preventDefault();
    //To do DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //create LI
    const newToDo = document.createElement('li');
    newToDo.innerText = todoInput.value;
    newToDo.classList.add('todo-item');
    todoDiv.appendChild(newToDo);
    //ADD to local storage
    saveLocalTodos(todoInput.value);
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></em>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
     //Delete button
     const deleteButton = document.createElement('button');
     deleteButton.innerHTML = '<em class="fas fa-trash"></em>';
     deleteButton.classList.add("delete-btn");
     todoDiv.appendChild(deleteButton);
     //star button
     const starButton = document.createElement('button');
     starButton.innerHTML = '<em class="fas fa-star"></em>';
     starButton.classList.add("star-btn");
     todoDiv.appendChild(starButton);
     //Append to list
     todoList.appendChild(todoDiv);
     //clear todo input value
     todoInput.value= "";
}
function deleteCheck(e){
    const item = e.target;

    //Delete Todo
    if (item.classList[0] === "delete-btn"){
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
        todo.remove();
        });
    }
    //Checkmark Todo
    if (item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
          
    }
    if(item.classList[0] === 'star-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("star");
        
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } 
                else {
                    todo.style.display = "none";
                }
                break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    }
                    else{
                        todo.style.display = "none";
                    }
                    break;
                    case "star":
                    if (todo.classList.contains("star")){
                        todo.style.display = "flex";
                    }
                    else{
                        todo.style.display = "none";
                    }
                    break;
            
        }
    });
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //create LI
    const newToDo = document.createElement('li');
    newToDo.innerText = todo;
    newToDo.classList.add('todo-item');
    todoDiv.appendChild(newToDo);
   
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></em>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
     //Delete button
     const deleteButton = document.createElement('button');
     deleteButton.innerHTML = '<em class="fas fa-trash"></em>';
     deleteButton.classList.add("delete-btn");
     todoDiv.appendChild(deleteButton);
     //Star button
     const starButton = document.createElement('button');
     starButton.innerHTML = '<em class="fas fa-star"></em>';
     starButton.classList.add("star-btn");
     todoDiv.appendChild(starButton);
     //Append to list
     todoList.appendChild(todoDiv);
        
    });
}
function removeLocalTodos(todo){
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
