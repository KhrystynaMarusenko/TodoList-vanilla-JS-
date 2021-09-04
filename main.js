const addTaskBtn = document.getElementById('add-task-btn');
const descTaskInput = document.getElementById('description-task');
const todosWrapper = document.querySelector('.todos-wrapper');

let tasks;

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(description) {
    this.description = description;
    //default meaning
    this.completed = false;
}

let todoItemElems = [];

const createTemplate = (task, index) => {
    return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick="likedTask(${index})"
                class="btn=complete" type="checkbox" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class="btn-delete">DELETE</button>
            </div>
        </div>  
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed === false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed === true);
    tasks = [...activeTasks, ...completedTasks]
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = '';
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item');
    }
}
fillHtmlList();



const updateLS = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', () =>{
    tasks.push(new Task(descTaskInput.value))
    updateLS();
    fillHtmlList();
    descTaskInput.value = '';
})



const likedTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLS();
    fillHtmlList();
}

const setTimeoutTime = 500;

const deleteTask = index => {
    todoItemElems[index].classList.add('deletion')
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLS();
        fillHtmlList();
    }, setTimeoutTime)
}



















/*
const filterTweets = () => {
    const activeTasks = tweets.length && tweets.filter(item => item.completed === false);
    const completedTasks = tweets.length && tweets.filter(item => item.completed === true);
    tweets = [...activeTasks, ...completedTasks]
}



const likedTweet = (index) => {
    tweets[index].completed = !tweets[index].completed;
    if (tweets[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLS();
    fillHtmlList();
}


const setTimeoutTime = 500;

const deleteTweet = index => {
    todoItemElems[index].classList.add('deletion')
    setTimeout(() => {
        tweets.splice(index, 1);
        updateLS();
        fillHtmlList();
    }, setTimeoutTime)
}
*/






