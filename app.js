/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent); 
  
    const deleteButton = document.querySelector('#btnDelete');
    const saveButton = document.querySelector('#btnSave');
    const userList = document.querySelector('.user-list');
    const portfolioDetails = document.querySelector('.portfolio-list');
  
    // Initial user list render
    generateUserList(userData);
  
    // Click listener for user list
    userList.addEventListener('click', (event) => handleUserListClick(event, userData));
  
    // Click listener for portfolio buttons
    portfolioDetails.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        viewStock(event.target.id, stocksData);
      }
    });
  
    // Delete user
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      const userId = document.querySelector('#userID').value;
      const userIndex = userData.findIndex(user => user.id == userId);
  
      if (userIndex !== -1) {
        userData.splice(userIndex, 1);
        generateUserList(userData);
        document.querySelector('form').reset();
        portfolioDetails.innerHTML = '';
      }
    });
  
    // Save user changes
    saveButton.addEventListener('click', (event) => {
      event.preventDefault();
      const id = document.querySelector('#userID').value;
      const userIndex = userData.findIndex(user => user.id == id);
  
      if (userIndex !== -1) {
        const updatedUser = {
          ...userData[userIndex],
          user: {
            firstname: document.querySelector('#firstname').value,
            lastname: document.querySelector('#lastname').value,
            address: document.querySelector('#address').value,
            city: document.querySelector('#city').value,
            email: document.querySelector('#email').value,
          }
        };
  
        userData.splice(userIndex, 1, updatedUser);
        generateUserList(userData);
      }
    });
  
    // --- Functions ---
  
    function generateUserList(users) {
      userList.innerHTML = '';
      users.forEach(({ user, id }) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${user.lastname}, ${user.firstname}`;
        listItem.setAttribute('id', id);
        userList.appendChild(listItem);
      });
    }
  
    function handleUserListClick(event, users) {
      const userId = event.target.id;
      const user = users.find(user => user.id == userId);
      if (user) {
        populateForm(user);
        renderPortfolio(user);
      }
    }
  
    function populateForm(data) {
      const { user, id } = data;
      document.querySelector('#userID').value = id;
      document.querySelector('#firstname').value = user.firstname;
      document.querySelector('#lastname').value = user.lastname;
      document.querySelector('#address').value = user.address;
      document.querySelector('#city').value = user.city;
      document.querySelector('#email').value = user.email;
    }
  
    function renderPortfolio(user) {
      const { portfolio } = user;
      portfolioDetails.innerHTML = `
        <h3>Symbol</h3>
        <h3># Shares</h3>
        <h3>Actions</h3>
      `;
  
      portfolio.forEach(({ symbol, owned }) => {
        const symbolEl = document.createElement('p');
        const sharesEl = document.createElement('p');
        const actionEl = document.createElement('button');
  
        symbolEl.innerText = symbol;
        sharesEl.innerText = owned;
        actionEl.innerText = 'View';
        actionEl.setAttribute('id', symbol);
  
        portfolioDetails.appendChild(symbolEl);
        portfolioDetails.appendChild(sharesEl);
        portfolioDetails.appendChild(actionEl);
      });
    }
  
    function viewStock(symbol, stocks) {
      const stock = stocks.find(s => s.symbol == symbol);
      const stockArea = document.querySelector('.stock-form');
  
      if (stock && stockArea) {
        document.querySelector('#stockName').textContent = stock.name;
        document.querySelector('#stockSector').textContent = stock.sector;
        document.querySelector('#stockIndustry').textContent = stock.subIndustry;
        document.querySelector('#stockAddress').textContent = stock.address;
        document.querySelector('#logo').src = `logos/${symbol}.svg`;
      }
    }
  });
