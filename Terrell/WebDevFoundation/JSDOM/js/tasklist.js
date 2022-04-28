(function(taskApp){
    `use strict`;
    const pageItems = {};

    taskApp.promisesStartup = function(){
        pageItems.loadData = document.getElementById('loadData');
        pageItems.waitIndicator = document.getElementById('waitIndicator');

        pageItems.loadData.addEventListener('click', saveDataToAPI);
    }

    taskApp.taskStartup = function() {
        const form = document.getElementById('taskForm');
        pageItems.taskList = document.getElementById('taskList');
        pageItems.taskInput= form.querySelector('#taskInput');
        pageItems.taskSubmit = form.querySelector('#taskSubmit');
        pageItems.taskRemove = form.querySelector('#taskRemove');

        pageItems.taskSubmit.addEventListener('click', addTask);
        pageItems.taskList.addEventListener('click', completeTask);
        pageItems.taskRemove.addEventListener('click', removeCompleted);

        loadFromStorage();
    };

    function loadFromAPI(e){
        fetch('https://swapi.dev/api/people/28')
        .then(response =>{
            console.log(response);
            return response.json();
        })
        .then(data => console.log(data))
        .catch(reason => console.error(reason));
    }

    function saveDataToAPI(e){
        const data ={
            firstName: 'Terrell',
            lastName: 'Turner',
            isAlive: true
        };

        fetch('https://webhook.site/595ba4c6-1190-4fb7-9f3f-c728c86631ce', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(
            response => console.log(response),
            reason => console.error(reason)
        )
    }

    function loadSimplePromiseData(){
        const promise = new Promise(function(resolve, reject){
            setTimeout(() => resolve('Resolved promise'), 3000)
        })

        promise.then(
            result => console.log(result),
            reason => console.error(reason)
        );
    }

    function loadChainedPromiseData(){
        const promise = new Promise(function(resolve, reject){
            setTimeout(() =>
                reject('Promise #1'), 3000)
             });

            promise.then( result =>{
                console.log('Promise #1 resolved!');
                return new Promise(function(resolve, reject){
                    setTimeout(() => 
                        resolve('Promise #2'),
                        2000);
                });
            })
            .then(result =>{
                console.log('Promise #2 resolved!');
            })
            .catch(reason =>{
                console.error(`Promise failure at \'${reason}'! Please show this to your nearest code primate.`);
            })
            .finally(() => console.log('All promises complete.'));
        };

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
        saveToStorage();
    }

    function removeCompleted(e){
        e.preventDefault();

        const items = Array.from(pageItems.taskList.children);
        items.forEach(el => {
            if(el.classList.contains('completed-item')){
                pageItems.taskList.removeChild(el);
            }
        });
        saveToStorage();
    }

    function saveToStorage(){
        const items = Array.from(pageItems.taskList.children);
        const itemsToSave = items.map(item => {
            return{
                task: item.innerText,
                isCompleted: item.classList.contains('completed-item')
            }
        })
        console.log(itemsToSave);

        localStorage.setItem('taskList', JSON.stringify(itemsToSave));
    }

    function loadFromStorage(){
        const itemsString = localStorage.getItem('taskList');
        if (itemsString != null) {
            const items = JSON.parse(itemsString);
            items.forEach(item =>{
                const li = document.createElement('li');
                li.innerText = item.task;
                if (item.isCompleted) {
                    li.classList.add('completed-item');
                }
                pageItems.taskList.appendChild(li);
            })
        }
    }

})(window.taskApp = window.taskApp || {});