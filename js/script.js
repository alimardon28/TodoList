"use strict";

let elForm = document.querySelector(".form");
let elInput = document.querySelector(".input");
let elList = document.querySelector(".list");


let elAllResult = document.querySelector(".all__result");
let elCompletedResult = document.querySelector(".completed__result");
let elUncompletedResult = document.querySelector(".uncompleted__result");

let elAllButton = document.querySelector(".all__button");
let elCompletedButton = document.querySelector(".completed__button");
let elUncompletedButton = document.querySelector(".uncompleted__button");

const todos = [];

elList.addEventListener("click" , function(evt){
   if(evt.target.matches(".delete-btn")){
     let todoBtnId = evt.target.dataset.todoId * 1 ;

     const foundTodoIndex = todos.findIndex(function(todo){
       return todo.id === todoBtnId;
     });

     todos.splice(foundTodoIndex, 1);

     elList.innerHTML = null;

     renderTodos(todos ,elList);
   }else if(evt.target.matches(".checkbox-btn")){
    let todoCheckId = evt.target.dataset.checkId * 1 ;

    const foundCheckbox = todos.find(function (todo){
        return todo.id === todoCheckId;
      });
      foundCheckbox.isCompleted = !foundCheckbox.isCompleted;

      elList.innerHTML = null;

      renderTodos(todos, elList);
   }
});


const renderTodos = function(arr , element){
   elAllResult.textContent = todos.length;
   elCompletedButton.textContent = todos.filter((todo) =>todo.isCompleted).length;
   elUncompletedButton.textContent = todos.filter(
     (todo) => !todo.isCompleted
   ).length;

    arr.forEach(todo =>{
        let newItem = document.createElement("li");
        let newDescText = document.createElement("p");
        let newCheckbox = document.createElement("input");
        let newDeleteBtn = document.createElement("button");


        newCheckbox.type = "checkbox";

        //TEXT CONTENT
        newItem.textContent = todo.title;
        newDeleteBtn.textContent = "Delete";

        //SETATRIBUTE
        newItem.setAttribute( "class" , "item d-flex  justify-content-between align-items-center");
        newDescText.setAttribute("class" , "text-light fs-1");
        newDeleteBtn.setAttribute("class" , "delete-btn btn btn-outline-danger ");
        newCheckbox.setAttribute("class" , "checkbox-btn form-check-input border-dark fs-3");

        //DATASET ADD
        newDeleteBtn.dataset.todoId = todo.id;
        newCheckbox.dataset.checkId = todo.id;

        if (todo.isCompleted){
            newCheckbox.checked = true;
            newItem.style.textDecoration = "line-through";
        }

        elAllButton.textContent = todos.length;

         //APPENDCHILD
        element.appendChild(newItem);
        newItem.appendChild(newDescText);
        newItem.appendChild(newCheckbox);
        newItem.appendChild(newDeleteBtn);

    })
}


//FORM SUBMIT
elForm.addEventListener("submit" ,evt => {
    evt.preventDefault();

    let inputValue = elInput.value.trim();



    let newTodo = {
        id:todos[todos.length - 1]?.id + 1 || 0 ,
        title:inputValue,
        isCompleted:false,
    };

    elList.innerHTML = null;
    elAllResult.textContent = 0;

    todos.push(newTodo);

    elInput.value = null;

    renderTodos(todos, elList);
} )


//ALL BUTTON
elAllButton.addEventListener("click" , function(){
    elList.innerHTML = null;

    renderTodos(todos, elList);
});

// COMPLITED BTN
elCompletedButton.addEventListener("click", function () {
    let filteredCompleted = todos.filter((todo) => todo.isCompleted);

    elList.innerHTML = null;
    renderTodos(filteredCompleted, elList);
  });

// UNCOMPLITED
  elUncompletedButton.addEventListener("click", function () {
    let filteredCompleted = todos.filter((todo) => !todo.isCompleted);

    elList.innerHTML = null;
    renderTodos(filteredCompleted, elList);
  });