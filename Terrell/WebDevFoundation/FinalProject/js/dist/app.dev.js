'use strict';

(function (app) {
  app.portfolioItems = [];
  app.selectedItem = {};

  app.homepage = function () {
    var contactSubmit = document.getElementById('submitContactForm');
    contactSubmit.addEventListener('click', submitContact);
    currentYear();
  };

  app.portfolio = function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            currentYear();
            _context.next = 3;
            return regeneratorRuntime.awrap(loadPageData());

          case 3:
            updateNav();
            updatePortfolioPage();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  app.workitems = function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            currentYear();
            _context2.next = 3;
            return regeneratorRuntime.awrap(loadPageData());

          case 3:
            updateNav();
            loadSpecificItem();
            updateItemPage();

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  };

  function currentYear() {
    var copyright = document.getElementById('copyright');
    copyright.innerText = new Date().getFullYear();
  } //   function queryItem() {
  //     const workitemQuery = new URL(document.location).searchParams;
  //     let selectedWorkItem = 0;
  //     try {
  //       selectedWorkItem = workitemQuery.get('workitem').valueOf();
  //     } catch (error) {}
  //     fetch('./js/workitems.json')
  //       .then((response) => {
  //         console.log(response);
  //         return response.json();
  //       })
  //       .then((data) => loadContent(data['workitem-elements'][selectedWorkItem]))
  //       .catch((reason) => {
  //         console.error(reason);
  //       });
  //   }
  //   function loadContent(data) {
  //     const main = document.getElementById('workitem-main');
  //     const workitemHeader = data['heading'];
  //     const pageHeader = main.querySelector('h2');
  //     pageHeader.innerText = workitemHeader;
  //     const workitemImage = data['image'];
  //     const pageImage = main.querySelector('img');
  //     pageImage.src = workitemImage;
  //     const workitemProject = data['project'].valueOf();
  //     const project = main.querySelector('#project-text p');
  //     project.innerText = workitemProject;
  //     const workitemTechnology = data['technologies'];
  //     const technology = main.querySelector('#technologies-text ul');
  //     workitemTechnology.forEach((el) => {
  //       const li = document.createElement('li');
  //       li.innerText = el['techName'].valueOf();
  //       technology.append(li);
  //     });
  //     const workitemChallenges = data['challenges'];
  //     const challenges = main.querySelector('#challenges-text p');
  //     challenges.innerText = workitemChallenges;
  //     console.log(workitemHeader);
  //   }


  function submitContact(e) {
    e.preventDefault();
    var contactForm = document.getElementById('form');
    var contactName = contactForm.querySelector('#name');
    var contactMessage = contactForm.querySelector('#message');
    window.open("mailto:terrell@saturnian.cc?subject=Hello Terrell!&body=Greetings,\n\n      %0D%0A %0D%0A".concat(contactMessage.value, "\n\n      %0D%0A %0D%0A Respectfully, ").concat(contactName.value, "%0D%0A"));
    contactForm.reset();
  }

  function loadPageData() {
    var cacheData, rawData, data;
    return regeneratorRuntime.async(function loadPageData$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            cacheData = sessionStorage.getItem('site-data');

            if (!(cacheData !== null)) {
              _context3.next = 5;
              break;
            }

            app.portfolioItems = JSON.parse(cacheData);
            _context3.next = 13;
            break;

          case 5:
            _context3.next = 7;
            return regeneratorRuntime.awrap(fetch('items.json'));

          case 7:
            rawData = _context3.sent;
            _context3.next = 10;
            return regeneratorRuntime.awrap(rawData.json());

          case 10:
            data = _context3.sent;
            app.portfolioItems = data;
            sessionStorage.setItem('site-data', JSON.stringify(data));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    });
  }

  function loadSpecificItem() {
    var params = new URLSearchParams(window.location.search);
    var item = Number.parseInt(params.get('workitem'));

    if (item > app.portfolioItems.length || item < 1) {
      item = 1;
    }

    app.selectedItem = app.portfolioItems[item - 1];
    app.selectedItem.id = item;
  }

  function updateItemPage() {
    var header = document.getElementById('workitem-header');
    header.innerText = "0".concat(app.selectedItem.id, ". ").concat(app.selectedItem.title);
    var image = document.getElementById('workitem-img');
    image.src = app.selectedItem.largeImage;
    image.alt = app.selectedItem.largeImageAlt;
    var origTechList = document.querySelector('#technologies-text ul');
    var technologiesSection = document.getElementById('technologies-text');
    var ul = document.createElement('ul');
    var project = document.querySelector('#project-text p');
    project.innerHTML = app.selectedItem.project;
    app.selectedItem.technologies.forEach(function (el) {
      var li = document.createElement('li');
      li.innerText = el;
      ul.appendChild(li);
    });
    origTechList.remove();
    technologiesSection.appendChild(ul);
    var challenges = document.querySelector('#challenges-text p');
    challenges.innerText = app.selectedItem.challenges;
  }

  function updatePortfolioPage() {
    var portfolioDiv = document.getElementById('portfolio-main');
    var reverseOrder = false;
    app.portfolioItems.forEach(function (el) {
      var itemDiv = document.createElement('div');
      var hightlightTextDiv = document.createElement('div');
      var highlightTitle = document.createElement('h2');
      var highlightImage = document.createElement('img');

      if (reverseOrder) {
        itemDiv.classList.add('portfolio-highlight', 'invert');
        reverseOrder = false;
      } else {
        itemDiv.classList.add('portfolio-highlight');
        reverseOrder = true;
      }

      highlightImage.src = el.smallImage;
      highlightImage.alt = el.smallImageAlt;
      highlightTitle.innerText = "0".concat(app.portfolioItems.indexOf(el) + 1, ". ").concat(el.title);
      hightlightTextDiv.appendChild(highlightTitle);
      hightlightTextDiv.appendChild(highlightImage);
      itemDiv.appendChild(hightlightTextDiv);
      itemDiv.appendChild(highlightImage);
      portfolioDiv.appendChild(itemDiv);
    });
  }

  function updateNav() {
    var nav = document.querySelector('nav');
    var originalList = nav.querySelector('ul');
    var navList = document.createElement('ul');
    var liHome = document.createElement('li');
    var aHome = document.createElement('a');
    var liPortfolio = document.createElement('li');
    var aPortfolio = document.createElement('a');
    aHome.href = 'index.html';
    aHome.innerText = 'Home';
    liHome.appendChild(aHome);
    aPortfolio.href = 'portfolio.html';
    aPortfolio.innerText = 'Portfolio';
    liPortfolio.appendChild(aPortfolio);
    navList.appendChild(liHome);
    navList.appendChild(liPortfolio);
    app.portfolioItems.forEach(function (el) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      var position = app.portfolioItems.indexOf(el) + 1;
      a.href = "workitem.html?workitem=".concat(position);
      a.innerText = "Item #".concat(position);
      li.appendChild(a);
      navList.append(li);
    });
    originalList.remove();
    nav.appendChild(navList);
  }
})(window.app = window.app || {});