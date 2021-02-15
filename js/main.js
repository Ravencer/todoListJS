'use strict';

let todoControl = document.querySelector('.todo-control');
let headerInput = document.querySelector('.header-input');
let todoList = document.querySelector('.todo-list');
let todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const render = function(){
  if(localStorage.getItem('todos') !== null){
    let output = JSON.parse(localStorage.getItem('todos'));
    todoData = [];
    output.forEach(function(item){
      todoData.push({
        value: item.value,
        completed: Boolean(item.completed)
      });
    });
  }
  todoList.textContent = '';
  todoCompleted.textContent = '';
  todoData.forEach(function(item){
    let li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
    '<div class="todo-buttons">'+
    '<button class="todo-remove"></button>'+
    '<button class="todo-complete"></button>'+
    '</div>';
    if(item.completed){
      todoCompleted.append(li);
    }
    else{
      todoList.append(li);
    }
    let todoCompletedBut = li.querySelector('.todo-complete');
    todoCompletedBut.addEventListener('click', function(){
      item.completed = !item.completed;
      let jsonToDo = JSON.stringify(todoData);
      localStorage.clear();
      localStorage.setItem("todos", jsonToDo);
      render();
    });
    let todoRemoveBut = li.querySelector('.todo-remove');
    todoRemoveBut.addEventListener('click', function(){
      
      let index = todoData.indexOf(item);
      todoData.splice(index, 1);
      let jsonToDo = JSON.stringify(todoData);
      localStorage.clear();
      localStorage.setItem("todos", jsonToDo);
      render();
    });
  });
};

todoControl.addEventListener('submit', function(event){
   event.preventDefault();
  if(headerInput.value.trim() !== ''){
  let newTodo = {
    value: headerInput.value,
    completed: false
  };
  todoData.push(newTodo);
  let jsonToDo = JSON.stringify(todoData);
  localStorage.clear();
  console.log(todoData);
  localStorage.setItem("todos", jsonToDo);
  headerInput.value = '';
  render();
  }
});

render();