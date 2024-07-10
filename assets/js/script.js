// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
const addTaskBtn = $('#add-task-btn');
const taskNameInput = $('#title');
const taskDateInput = $('#datepicker');
const taskDescriptionInput = $('#description');
const taskDisplayEl = $('.swim-lanes');


function generateTaskId() {
    return crypto.randomUUID();
}

function readTasksFromStorage() {

    let tasks = JSON.parse(localStorage.getItem('task-list'));
    if (!tasks) {
      tasks = [];
    }
    return tasks;
  }

function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-task-id', task.id);

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
        .text('Delete').attr('data-task-id', task.id);


    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');
    
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


function renderTaskList(tasks) { 
    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();


    for(const task of tasks){
        if(task.status === 'to-do')
        {
            todoList.append(createTaskCard(task));
        }

        else if(task.status === 'in-progress'){
            inProgressList.append(createTaskCard(task));
        }

        else if(task.status === 'done'){
            doneList.append(createTaskCard(task));
        }
    }          

    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
        helper: function (e) {
          // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
          const original = $(e.target).hasClass('ui-draggable')
            ? $(e.target)
            : $(e.target).closest('.ui-draggable');
          // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
          return original.clone().css({
            width: original.outerWidth(),
          });
        },
      });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    // event.preventDefault();

    let taskList = readTasksFromStorage();

    const taskName = taskNameInput.val().trim();
    const taskDue = taskDateInput.val();
    const taskDescription = taskDescriptionInput.val();

    if (taskName === ''||taskDue === ''||taskDescription=== '')
    {
        return;
    }

    const newTask = {
        id: generateTaskId(),
        name: taskName,
        dueDate: taskDue,
        descrip: taskDescription,
        status: 'to-do',
    };

    taskList.push(newTask);

    taskNameInput.val('');
    taskDateInput.val('');
    taskDescriptionInput.val('');
  
    localStorage.setItem('task-list', JSON.stringify(taskList));
    renderTaskList(taskList);



}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    event.preventDefault();
    const taskId = $(this).attr('data-task-id');
    const tasks = readTasksFromStorage();

    for(let task of tasks)
    {
        if(task.id === taskId){
            tasks.splice(tasks.indexOf(task),1);
        }
    }

    localStorage.setItem('task-list', JSON.stringify(tasks));    

    renderTaskList(tasks);
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    event.preventDefault();
    const tasks = readTasksFromStorage();

    const taskId = ui.draggable[0].dataset.taskId;

    const newStatus = event.target.id;

    for(let task of tasks){
        if(task.id === taskId){
            task.status = newStatus;
        }
    }

    localStorage.setItem('task-list', JSON.stringify(tasks)); 
    renderTaskList(tasks);
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList(readTasksFromStorage());
    $("#datepicker").datepicker();
    

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
      });
      
    $("#add-task-btn").click(function() {
      $("#modalForm").dialog({
        modal: true,
        buttons: {
          "Submit": function() {
            
            handleAddTask();
            
            $(this).dialog("close");
          },
        }
      });
    });

    taskDisplayEl.on('click', '.delete', handleDeleteTask);
  
});
