(function(taskApp){
    `use strict`;
    const pageItems = {};

    taskApp.taskStartup = function() {
        const form = document.getElementById('taskForm');
        pageItems.taskList = document.getElementById('taskList');
        pageItems.taskInput= form.querySelector('#taskInput');
        pageItems.taskSubmit = form.querySelector('#taskSubmit');
        pageItems.taskRemove = form.querySelector('#taskRemove');

        pageItems.taskSubmit.addEventListener('click', addTask);
        pageItems.taskList.addEventListener('click', completeTask);
        pageItems.taskRemove.addEventListener('click', removeCompleted);
    }

    function addTask(e) {
        e.preventDefault();

        const li = document.createElement('li');
        li.innerText = pageItems.taskInput.value;

        pageItems.taskList.appendChild(li);

        taskInput.value = '';
        checkCompleted();
    }

    function completeTask(e){
        if(e.target.classList.contains('completed-item')){
            e.target.classList.remove('completed-item');
            checkCompleted();
        } else{
            e.target.classList.add('completed-item');
            checkCompleted();
        }
    }

    function checkCompleted(){
        const items = Array.from(pageItems.taskList.children);
        items.forEach(el => {
            if (el.classList.contains('completed-item')) {
                const li = document.createElement('li');
                li.innerText = el.innerText;
                pageItems.taskList.removeChild(el);
                li.classList.add('completed-item');
                pageItems.taskList.appendChild(li);
            }
        });
    }

    function removeCompleted(e){
        e.preventDefault();

        const items = Array.from(pageItems.taskList.children);
        items.forEach(el => {
            if(el.classList.contains('completed-item')){
                pageItems.taskList.removeChild(el);
            }
        });
    }

})(window.taskApp = window.taskApp || {});