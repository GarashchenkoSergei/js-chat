export default {
  getData() {
    let request = new XMLHttpRequest();
    request.open("GET", "../data/data.json", false);
    request.send(null);
    
    return JSON.parse(request.responseText);
  },

  getCurrentUser() {
    const cookies = document.cookie.split('; ').reduce((prev, current) => {
      const [name, value] = current.split('=');
  
      prev.name = name;
      prev.id = value;
  
      return prev;
    }, {});

    let currentUser = {};
    currentUser.name = cookies.name;
    currentUser.id = cookies.id;
    currentUser.photo = '../pictures/user.png';
    
    return currentUser;
  }
}