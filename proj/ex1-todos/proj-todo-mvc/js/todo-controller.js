function renderTodos() {
    var todos = getTodosForDisplay();
    var strHTMLs = todos.map(function (todo) {
        return `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
                                            ${todo.txt}
                                            <button onclick="onUpTodo('${todo.id}', event)">up</button>
                                            <button onclick="onDownTodo('${todo.id}', event)">down</button>
                                            <button onclick="onRemoveTodo('${todo.id}', event)">x</button>
                                        </li>`
    })

    console.log(strHTMLs)
    var elTodoList = document.querySelector('.todo-list');
    elTodoList.innerHTML = strHTMLs.join('');

    document.querySelector('.todo-total').innerText = getTotalCount()
    document.querySelector('.todo-active').innerText = getActiveCount()
}


function onRemoveTodo(todoId, ev) {
    ev.stopPropagation();
     if (!confirm('Are you sure?!')) return
    removeTodo(todoId);
    renderTodos();
}

function onAddTodo() {
    var elTodoTxt = document.querySelector('input[name=todoTxt]');
    var elImportance = document.querySelector('input[name=todoImportance]');
    if (elTodoTxt.value==='')return;
    addTodo(elTodoTxt.value,+elImportance.value);
    console.log(gTodos);
    renderTodos();
    elTodoTxt.value = '';

}


function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onSetFilter(filterBy) {
    console.log('Filtering by', filterBy);
    setFilter(filterBy);
    renderTodos();
}
function onSetSort(sortBy){
    console.log('sort by', sortBy);
    setSort(sortBy);
    renderTodos();
}
 function onUpTodo(todoId, ev){
    ev.stopPropagation();
    moveUpTodo(todoId);
    renderTodos();

}
function onDownTodo(todoId, ev){
    ev.stopPropagation();
    moveDownTodo(todoId);
    renderTodos();

}