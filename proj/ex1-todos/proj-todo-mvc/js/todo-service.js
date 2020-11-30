const STORAGE_KEY = 'todosDB';

var gTodos;
var gFilterBy = 'all';
gSortBy = 'txt';

_createTodos();

function getTodosForDisplay() {
    var todos;
    if (gFilterBy === 'all') todos = gTodos;
    else {
        todos = gTodos.filter(function (todo) {
            return (todo.isDone && gFilterBy === 'done' ||
                !todo.isDone && gFilterBy === 'active')

        })
    }
    if (gSortBy === 'txt') sortByTxt(todos)
    // else if (gSortBy === 'created') sortByCreateTime(todos)
    else sortByImportance(todos)
    return todos;
}
function sortByTxt(todos) {
    todos.sort(function (todo1, todo2) {
        if (todo1.txt > todo2.txt) return 1
        else if (todo1.txt < todo2.txt) return -1;
        else return0;
    })

}
function sortByImportance(todos) {
    todos.sort(function (todo1, todo2) {
        return todo1.importance - todo2.importance
    })
}
function removeTodo(id) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === id
    })
    gTodos.splice(idx, 1);
    _saveTodosToStorage();
}
function toggleTodo(id) {
    var todo = gTodos.find(function (todo) {
        return todo.id === id
    })
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}

function addTodo(txt, importance) {
    var todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    _saveTodosToStorage();
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}
function setSort(sortBy) {
    gSortBy = sortBy;
}

function getTotalCount() {
    return gTodos.length
}
function getActiveCount() {
    var count = 0;
    gTodos.forEach(function (todo) {
        if (!todo.isDone) count++;
    })
    return count;
}
function getTime() {
    return Date.now()

}
function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY)

    if (!todos || todos.length === 0) {
        todos = [_createTodo('hello'), _createTodo('hi'), _createTodo('clean')];

    }
    gTodos = todos;
    _saveTodosToStorage();
}
function _createTodo(txt, importance = 0) {
    var todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: getTime(),
        importance: importance
    }

    return todo;
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos)
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
function  moveUpTodo(todoId){
    if(gFilterBy!=='all')return
    gSortBy='';
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    if(idx===0)return;
    var tempTodo=gTodos[idx-1];
    gTodos[idx-1]=gTodos[idx];
    gTodos[idx]=tempTodo;
    _saveTodosToStorage;

}
function  moveDownTodo(todoId){
    if(gFilterBy!=='all')return
    gSortBy='';
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    if(idx===gTodos.length-1)return;
    var tempTodo=gTodos[idx+1];
    gTodos[idx+1]=gTodos[idx];
    gTodos[idx]=tempTodo;
    _saveTodosToStorage;

}