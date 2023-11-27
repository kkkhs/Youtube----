const todoList = JSON.parse(localStorage.getItem('data'))
||
[];
renderTodoList(); //刷新页面后调用
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

  for(let i = 0; i < todoList.length; i ++){
    const todoObject = todoList[i];
    //const name = todoObject.name;
    //const dueDate = todoObject.dueDate;
    const {name} = todoObject;
    const {dueDate} = todoObject;
    const html = `
    <div>${name}</div>
    <div>${dueDate}</div>
    <button onclick="
      todoList.splice(${i}, 1);
      renderTodoList();
    " class = "delete-todo-button">Delete</button> 
    `;
    todoListHTML += html;
  }
  //console.log(todoListHTML);
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  localStorage.removeItem('data', JSON.stringify(todoList)); //更新之前的存储
  localStorage.setItem('data', JSON.stringify(todoList));
}
