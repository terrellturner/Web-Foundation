'use strict';

(function (app) {
  app.portfolioItems = [];
  app.selectedItem = {};

  app.homepage = function () {
    const contactSubmit = document.getElementById('submitContactForm');
    contactSubmit.addEventListener('click', submitContact);

    currentYear();
  };

  app.portfolio = async function () {
    currentYear();
    await loadPageData();
    updateNav();
    updatePortfolioPage();
  };

  app.workitems = async function () {
    currentYear();

    await loadPageData();
    updateNav();
    loadSpecificItem();
    updateItemPage();
  };

  function currentYear() {
    const copyright = document.getElementById('copyright');
    copyright.innerText = new Date().getFullYear();
  }

  //   function queryItem() {
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
    const contactForm = document.getElementById('form');
    const contactName = contactForm.querySelector('#name');
    const contactMessage = contactForm.querySelector('#message');

    window.open(
      `mailto:terrell@saturnian.cc?subject=Hello Terrell!&body=Greetings,

      %0D%0A %0D%0A${contactMessage.value}

      %0D%0A %0D%0A Respectfully, ${contactName.value}%0D%0A`
    );
    contactForm.reset();
  }

  async function loadPageData() {
    const cacheData = sessionStorage.getItem('site-data');

    if (cacheData !== null) {
      app.portfolioItems = JSON.parse(cacheData);
    } else {
      const rawData = await fetch('items.json');
      const data = await rawData.json();
      app.portfolioItems = data;
      sessionStorage.setItem('site-data', JSON.stringify(data));
    }
  }

  function loadSpecificItem() {
    const params = new URLSearchParams(window.location.search);
    let item = Number.parseInt(params.get('workitem'));

    if (item > app.portfolioItems.length || item < 1) {
      item = 1;
    }

    app.selectedItem = app.portfolioItems[item - 1];
    app.selectedItem.id = item;
  }

  function updateItemPage() {
    const header = document.getElementById('workitem-header');
    header.innerText = `0${app.selectedItem.id}. ${app.selectedItem.title}`;

    const image = document.getElementById('workitem-img');
    image.src = app.selectedItem.largeImage;
    image.alt = app.selectedItem.largeImageAlt;

    const origTechList = document.querySelector('#technologies-text ul');
    const technologiesSection = document.getElementById('technologies-text');
    const ul = document.createElement('ul');

    const project = document.querySelector('#project-text p');
    project.innerHTML = app.selectedItem.project;

    app.selectedItem.technologies.forEach((el) => {
      const li = document.createElement('li');
      li.innerText = el;
      ul.appendChild(li);
    });

    origTechList.remove();
    technologiesSection.appendChild(ul);

    const challenges = document.querySelector('#challenges-text p');
    challenges.innerText = app.selectedItem.challenges;
  }

  function updatePortfolioPage() {
    const portfolioDiv = document.getElementById('portfolio-main');
    let reverseOrder = false;

    app.portfolioItems.forEach((el) => {
      const itemDiv = document.createElement('div');
      const hightlightTextDiv = document.createElement('div');
      const highlightTitle = document.createElement('h2');
      const highlightImage = document.createElement('img');

      if (reverseOrder) {
        itemDiv.classList.add('portfolio-highlight', 'invert');
        reverseOrder = false;
      } else {
        itemDiv.classList.add('portfolio-highlight');
        reverseOrder = true;
      }

      highlightImage.src = el.smallImage;
      highlightImage.alt = el.smallImageAlt;

      highlightTitle.innerText = `0${app.portfolioItems.indexOf(el) + 1}. ${
        el.title
      }`;

      hightlightTextDiv.appendChild(highlightTitle);
      hightlightTextDiv.appendChild(highlightImage);

      itemDiv.appendChild(hightlightTextDiv);
      itemDiv.appendChild(highlightImage);

      portfolioDiv.appendChild(itemDiv);
    });
  }

  function updateNav() {
    const nav = document.querySelector('nav');
    const originalList = nav.querySelector('ul');
    const navList = document.createElement('ul');

    const liHome = document.createElement('li');
    const aHome = document.createElement('a');
    const liPortfolio = document.createElement('li');
    const aPortfolio = document.createElement('a');

    aHome.href = 'index.html';
    aHome.innerText = 'Home';
    liHome.appendChild(aHome);

    aPortfolio.href = 'portfolio.html';
    aPortfolio.innerText = 'Portfolio';
    liPortfolio.appendChild(aPortfolio);

    navList.appendChild(liHome);
    navList.appendChild(liPortfolio);

    app.portfolioItems.forEach((el) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const position = app.portfolioItems.indexOf(el) + 1;

      a.href = `workitem.html?workitem=${position}`;
      a.innerText = `Item #${position}`;

      li.appendChild(a);
      navList.append(li);
    });

    originalList.remove();
    nav.appendChild(navList);
  }
})((window.app = window.app || {}));
