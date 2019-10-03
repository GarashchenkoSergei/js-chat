import Model from './model.js';
import View from './view.js';

const usersList = document.querySelector('.users__list');
const messagesList = document.querySelector('.messages-user__list');
const messagesContainer = document.querySelector('.content__messages');

// установка текущего пользователя
let currentUser = Model.getCurrentUser();
if (currentUser.name && currentUser.id) {
  usersList.appendChild(View.renderUser(currentUser));
}

document.addEventListener("DOMContentLoaded", renderInfo());
View.usersCounter(document.querySelectorAll('.users__item'));

// отображение информации с "сервера"
function renderInfo() {
  const data = Model.getData();

  if (!data) {
    return alert('Чат пуст');
  }

  for (let user of data) {
    let info = {};
    info.id = user.id;
    info.name = `${user.name} ${user.lastName}`;
    info.photo = user.photo;
    info.message = user.messages[user.messages.length -1].text;
    info.messages = [];
    for (let message of user.messages) {
      info.messages.push(message);
    }

    usersList.appendChild(View.renderUser(info));
    messagesList.appendChild(View.renderMessage(info));
    // реализовать подгрузку сообщений в 
    // хронологии. Записть всех сообщений в массив, 
    // сортировка по времени, потом рендер 
    // (лево/право зависит от id)
  }

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

// обработка клика при добавлении сообщения
const button = document.querySelector('.add-message__button');
const input = document.querySelector('.add-message__text');
button.addEventListener('click', () => {
  let localTime = new Date().toLocaleString("ru", { hour: 'numeric', minute: 'numeric' });
  let info = {};
  info.id = currentUser.id;
  info.photo = currentUser.photo;
  info.messages = [];
  info.messages.push({ text: input.value, time: localTime });

  if (!input.value) {
    return;
  }

  if (messagesList.lastElementChild.classList.contains('messages-user__item_reverse')) {
    messagesList.lastElementChild.lastElementChild.appendChild(View.addMessage(input.value, localTime));
  } else {
    messagesList.appendChild(View.renderMessage(info));
  }

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  const usersList = document.querySelectorAll('.user-name');
  
  for (let user of usersList) {
    if (user.innerText == currentUser.name) {
      user.nextElementSibling.innerText = input.value;
    }
  }

  input.value = '';

  // добавить функцию для отправки сообщения на 'сервер' - для внесения в общий список сообщений

});

const usersNames = usersList.querySelectorAll('.user-name');
for (let name of usersNames) {
  if (name.innerText == currentUser.name) {
    const currentUserElement = name.parentNode.previousElementSibling;
    View.addPhoto(currentUserElement);
  }
}

const searchInput = document.querySelector('.users__search');
searchInput.addEventListener('keyup', function() {
  View.searchFunc();
});

export {currentUser};