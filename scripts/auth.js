const authButton = document.querySelector('.auth__button');

authButton.addEventListener('click', () => {
  const nameInput = document.querySelector('.auth__input_name');
  const lastNameInput = document.querySelector('.auth__input_lastName');

  if (nameInput.value && lastNameInput.value) {
    // здесь поменять - убрать цифру 3 
    // - это фиксированная id (заглушка). 
    // Эту цифру нужно получать с сервера
    document.cookie = `${nameInput.value} ${lastNameInput.value} = 3`;
  } else {
    alert('введите данные');
  }

  nameInput.value = '';
  lastNameInput.value = '';

  // перезагрузка - имитация перехода на новую страницу с чатом
  document.location.reload(true);
})