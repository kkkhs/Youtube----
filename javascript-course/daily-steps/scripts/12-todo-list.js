const todoList = JSON.parse(localStorage.getItem('data'))
||
[];
renderTodoList(); //刷新页面后调用

document.querySelector('.js-add-todo-button').addEventListener('click',() =>{
  addTodo();
});

function addTodo(){
  const inputElement = document.querySelector('.js-name-input');
  const dateInputElement = document.querySelector('.js-due-date-input');
  const name = inputElement.value;  //获取输入框字符.value
  const dueDate = dateInputElement.value;
  // console.log(name);
  if(name != '' && dueDate != ''){
    todoList.push(
      {
        // name: name, 
        // dueDate:dueDate
        name,
        dueDate
      }
      );
  
    inputElement.value = '';  //重置文本框
  
    renderTodoList();
    
  }
}

function renderTodoList(){
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const {name, dueDate} = todoObject;
    const html = `
    <div>${name}</div>
    <div>${dueDate}</div>
    <button class = "delete-todo-button js-delete-todo-button">Delete</button> 
    `;
    todoListHTML += html;
    //给All删除按钮添加监听器 ***************************************************************
  });

  //console.log(todoListHTML);
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click',() =>{
      todoList.splice(index, 1);
      renderTodoList();
    });
  });
  
  localStorage.removeItem('data', JSON.stringify(todoList)); //更新之前的存储
  localStorage.setItem('data', JSON.stringify(todoList));
}
