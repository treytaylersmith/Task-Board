// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const addTaskBtn = $('add-task-btn');


// Todo: create a function to generate a unique task id
function generateTaskId() {
    return crypto.randomUUID();
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('div')
        .addClass('card project-card draggable my-3')
        .attr('data-project-id', generateTaskId());

    const taskHeader = $('<div>')
            .addClass('card-header h4')
            .text(task.name);
    
    const taskBody = $('<div>').addClass('card-body');
   
    const taskDescription = $('<p>')
        .addClass('card-text')
        .text(task.descrip);
    
    const taskDueDate = $('<p>')
        .addClass('card-text')
        .text(task.dueDate);
    
    const taskDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete').attr('data-project-id', project.id);


    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');
    
        // ? If the task is due today, make the card yellow. If it is overdue, make it red.
        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            taskDeleteBtn.addClass('border-light');
        }
    }

    taskBody.append(taskDescription, taskDueDate, taskDeleteBtn);
    taskCard.append(taskHeader, taskBody);
    
    return taskCard;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList(tasks) { 
    
   
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
