import {currentUser} from './controller.js';

export default {
  renderUser(data) {
    const templateElement = document.querySelector('#user');
    const templateSource = templateElement.innerHTML;
    const renderFn = Handlebars.compile(templateSource);
    const result = renderFn(data);
    const listItem = document.createElement('LI');
    listItem.classList.add('users__item');
    listItem.innerHTML = result;

    return listItem;
  },

  renderMessage(data) {
    const templateElement = document.querySelector('#message');
    const templateSource = templateElement.innerHTML;
    const renderFn = Handlebars.compile(templateSource);
    const result = renderFn(data);
    const listItem = document.createElement('LI');

    listItem.classList.add('messages-user__item');
    listItem.innerHTML = result;
    if (data.id == currentUser.id) {
      listItem.classList.add('messages-user__item_reverse');

      const messagesList = listItem.querySelector('.messages__list');
      messagesList.classList.add('messages__list_reverse');

      const messageItems = listItem.querySelectorAll('.messages__item');
      for (let message of messageItems) {
        message.classList.add('messages__item_reverse');
      }
    }
  
    return listItem;
  },

  addMessage(text, time) {
    const messageItem = document.createElement('LI');
    messageItem.classList.add('messages__item');
    messageItem.classList.add('messages__item_reverse');
    messageItem.textContent = `${text} ${time}`;

    return messageItem;
  },

  usersCounter(usersList) {
    const counterElement = document.querySelector('.header__users-count');
    counterElement.innerText = `${ usersList.length } участника`
  },

  addPhoto(element) {
    element.addEventListener('mouseover', () => {
      element.lastElementChild.style.display = 'none';
      element.firstElementChild.style.display = 'flex';
    });
    element.addEventListener('mouseout', () => {
      element.lastElementChild.style.display = 'block';
      element.firstElementChild.style.display = 'none';
    });
    element.addEventListener('click', () => {
      const overlay = document.querySelector('.overlay');
      const overlayCancelButton = document.querySelector('.overlay-button_cancel');
      overlay.style.display = 'flex';
      overlayCancelButton.addEventListener('click', () => {
        overlay.style.display = 'none';
      })
    });
  },

  searchFunc() {
    var input, filter, ul, li, text;
    input = document.querySelector('.users__search');
    filter = input.value.toUpperCase();
    ul = document.querySelector(".users__list");
    li = ul.querySelectorAll('.users__item');
    text = ul.querySelectorAll('.user-name');

    // Loop through all list items, and show those who match the search query
    for (let i = 0; i < text.length; i++) {
      if (text[i].innerText.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "flex";
      } else {
          li[i].style.display = "none";
      }
    }
  }
}