let customers = [];
let loggedIn = false;

function createAccount() {
  const username = getValueById('username');
  const password = getValueById('password');

  if (username && password) {
    try {
      // Account creation logic (assumed to be successful)
      showMessage('success', 'Account created successfully. Please login.');
      clearInputFields('username', 'password');
    } catch (error) {
      showMessage('error', 'Failed to create an account. Please try again.');
    }
  } else {
    showMessage('error', 'Please enter a username and password.');
  }
}

function login() {
  const username = getValueById('username');
  const password = getValueById('password');

  if (username && password) {
    try {
      // Login logic (assumed to be successful)
      loggedIn = true;
      showDashboard();
      clearInputFields('username', 'password');
    } catch (error) {
      showMessage('error', 'Login failed. Please check your credentials.');
    }
  } else {
    showMessage('error', 'Please enter a username and password.');
  }
}

function logout() {
  loggedIn = false;
  showDashboard();
}

function showDashboard() {
  const loginForm = getSelector('.form-container');
  const dashboard = getById('dashboard');

  loginForm.style.display = loggedIn ? 'none' : 'block';
  dashboard.style.display = loggedIn ? 'block' : 'none';
}

function recordDebt() {
  const customerName = getValueById('customerName');
  const debtAmount = parseFloat(getValueById('debtAmount'));

  if (customerName && debtAmount) {
    try {
      customers.push({ name: customerName, supplied: 0, borrowed: debtAmount });
      showCustomers();
      showMessage('success', 'Debt recorded successfully.');
      clearInputFields('customerName', 'debtAmount');
    } catch (error) {
      showMessage('error', 'Failed to record debt. Please try again.');
    }
  } else {
    showMessage('error', 'Please enter a customer name and debt amount.');
  }
}

function recordSupply() {
  const customerName = getValueById('customerName');
  const supplyAmount = parseFloat(getValueById('supplyAmount'));

  if (customerName && supplyAmount) {
    const customer = customers.find((customer) => customer.name === customerName);

    if (customer) {
      customer.supplied += supplyAmount;
      showCustomers();
      showMessage('success', 'Supply recorded successfully.');
      clearInputFields('customerName', 'supplyAmount');
    } else {
      showMessage('error', `Customer "${customerName}" not found.`);
    }
  } else {
    showMessage('error', 'Please enter a customer name and supply amount.');
  }
}

function searchCustomer() {
  const searchName = getValueById('searchName');
  const result = customers.find((customer) => customer.name === searchName);

  if (result) {
    showMessage(
      'success',
      `Customer "${result.name}" found. Amount Supplied: $${result.supplied}, Amount Borrowed: $${result.borrowed}, Balance Amount: $${result.supplied - result.borrowed}`
    );
  } else {
    showMessage('error', `Customer "${searchName}" not found.`);
  }
}

function deleteCustomer() {
  const deleteName = getValueById('deleteName');
  const index = customers.findIndex((customer) => customer.name === deleteName);

  if (index !== -1) {
    try {
      customers.splice(index, 1);
      showCustomers();
      showMessage('success', `Customer "${deleteName}" deleted successfully.`);
      clearInputFields('deleteName');
    } catch (error) {
      showMessage('error', 'Failed to delete customer. Please try again.');
    }
  } else {
    showMessage('error', `Customer "${deleteName}" not found.`);
  }
}

function showCustomers() {
  const customersTableBody = getById('customersTableBody');
  customersTableBody.innerHTML = '';

  customers.forEach((customer) => {
    const row = createElement('tr');
    row.innerHTML = `
      <td>${customer.name}</td>
      <td>${customer.supplied}</td>
      <td>${customer.borrowed}</td>
      <td>${customer.supplied - customer.borrowed}</td>
    `;
    appendStatementCell(row, customer);
    customersTableBody.appendChild(row);
  });
}

function appendStatementCell(row, customer) {
  const cell = createElement('td');
  const button = createElement('button');
  button.textContent = 'View Statement';
  button.onclick = () => viewStatement(customer);
  cell.appendChild(button);
  row.appendChild(cell);
}

function viewStatement(customer) {
  const { name, supplied, borrowed } = customer;
  const balance = supplied - borrowed;

  showMessage(
    'success',
    `Customer "${name}" - Statement of Account:\n\nAmount Supplied: $${supplied}\nAmount Borrowed: $${borrowed}\nBalance Amount: $${balance}`
  );
}

function showMessage(type, message) {
  const messageContainer = document.createElement('div');
  messageContainer.className = type;
  messageContainer.textContent = message;
  getById('dashboard').insertBefore(messageContainer, getById('dashboard').firstChild);
  setTimeout(() => {
    messageContainer.remove();
  }, 3000);
}

function getValueById(id) {
  return getById(id).value;
}

function clearInputFields(...ids) {
  ids.forEach((id) => {
    getById(id).value = '';
  });
}

function getById(id) {
  return document.getElementById(id);
}

function createElement(tagName) {
  return document.createElement(tagName);
}

function getSelector(selector) {
  return document.querySelector(selector);
}

// Initially, show the dashboard and customers
showDashboard();
showCustomers();
