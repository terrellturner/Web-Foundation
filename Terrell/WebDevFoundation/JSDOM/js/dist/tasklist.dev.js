"use strict";

(function (taskApp) {
  "use strict";

  var pageItems = {};

  taskApp.promisesStartup = function () {
    pageItems.loadData = document.getElementById("loadData");
    pageItems.waitIndicator = document.getElementById("waitIndicator");
    pageItems.loadData.addEventListener("click", saveDataToAPI);
  };

  taskApp.taskStartup = function () {
    var form = document.getElementById("taskForm");
    pageItems.taskList = document.getElementById("taskList");
    pageItems.taskInput = form.querySelector("#taskInput");
    pageItems.taskSubmit = form.querySelector("#taskSubmit");
    pageItems.taskRemove = form.querySelector("#taskRemove");
    pageItems.taskSubmit.addEventListener("click", addTask);
    pageItems.taskList.addEventListener("click", completeTask);
    pageItems.taskRemove.addEventListener("click", removeCompleted);
    loadFromStorage();
  };

  function loadFromAPI(e) {
    fetch("https://swapi.dev/api/people/28").then(function (response) {
      console.log(response);
      return response.json();
    }).then(function (data) {
      return console.log(data);
    })["catch"](function (reason) {
      return console.error(reason);
    });
  }

  function saveDataToAPI(e) {
    var data = {
      firstName: "Terrell",
      lastName: "Turner",
      isAlive: true
    };
    fetch("https://webhook.site/595ba4c6-1190-4fb7-9f3f-c728c86631ce", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(function (response) {
      return console.log(response);
    }, function (reason) {
      return console.error(reason);
    });
  }

  function loadSimplePromiseData() {
    var promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        return resolve("Resolved promise");
      }, 3000);
    });
    promise.then(function (result) {
      return console.log(result);
    }, function (reason) {
      return console.error(reason);
    });
  }

  function loadChainedPromiseData() {
    var promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        return reject("Promise #1");
      }, 3000);
    });
    promise.then(function (result) {
      console.log("Promise #1 resolved!");
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          return resolve("Promise #2");
        }, 2000);
      });
    }).then(function (result) {
      console.log("Promise #2 resolved!");
    })["catch"](function (reason) {
      console.error("Promise failure at '".concat(reason, "'! Please show this to your nearest code primate."));
    })["finally"](function () {
      return console.log("All promises complete.");
    });
  }

  function addTask(e) {
    e.preventDefault();
    var li = document.createElement("li");
    li.innerText = pageItems.taskInput.value;
    pageItems.taskList.appendChild(li);
    taskInput.value = "";
    checkCompleted();
  }

  function completeTask(e) {
    if (e.target.classList.contains("completed-item")) {
      e.target.classList.remove("completed-item");
      checkCompleted();
    } else {
      e.target.classList.add("completed-item");
      checkCompleted();
    }
  }

  function checkCompleted() {
    var items = Array.from(pageItems.taskList.children);
    items.forEach(function (el) {
      if (el.classList.contains("completed-item")) {
        var li = document.createElement("li");
        li.innerText = el.innerText;
        pageItems.taskList.removeChild(el);
        li.classList.add("completed-item");
        pageItems.taskList.appendChild(li);
      }
    });
    saveToStorage();
  }

  function removeCompleted(e) {
    e.preventDefault();
    var items = Array.from(pageItems.taskList.children);
    items.forEach(function (el) {
      if (el.classList.contains("completed-item")) {
        pageItems.taskList.removeChild(el);
      }
    });
    saveToStorage();
  }

  function saveToStorage() {
    var items = Array.from(pageItems.taskList.children);
    var itemsToSave = items.map(function (item) {
      return {
        task: item.innerText,
        isCompleted: item.classList.contains("completed-item")
      };
    });
    console.log(itemsToSave);
    localStorage.setItem("taskList", JSON.stringify(itemsToSave));
  }

  function loadFromStorage() {
    var itemsString = localStorage.getItem("taskList");

    if (itemsString != null) {
      var items = JSON.parse(itemsString);
      items.forEach(function (item) {
        var li = document.createElement("li");
        li.innerText = item.task;

        if (item.isCompleted) {
          li.classList.add("completed-item");
        }

        pageItems.taskList.appendChild(li);
      });
    }
  }
})(window.taskApp = window.taskApp || {});