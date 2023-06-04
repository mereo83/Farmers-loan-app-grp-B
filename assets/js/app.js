let customers = [];
let loggedIn = false;

function createAccount() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) {
    try {
      // Implement account creation logic here
      // For simplicity, let's assume the account is created successfully
      showMessage('success', 'Account created successfully. Please login.');
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
    } catch (error) {
      showMessage('error', 'Failed to create an account. Please try again.');
    }
  } else {
    showMessage('error', 'Please enter a username and password.');
  }
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) {
    try {
      // Implement login logic here
      // For simplicity, let's assume the login is successful
      loggedIn = true;
      showDashboard();
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
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
  const loginForm = document.querySelector('.form-container');
  const dashboard = document.getElementById('dashboard');

  if (loggedIn) {
    loginForm.style.display = 'none';
    dashboard.style.display = 'block';
  } else {
    loginForm.style.display = 'block';
    dashboard.style.display = 'none';
  }
}

function recordDebt() {
  const customerName = document.getElementById('customerName').value;
  const debtAmount = parseFloat(document.getElementById('debtAmount').value);

  if (customerName && debtAmount) {
    try {
      customers.push({ name: customerName, supplied: 0, borrowed: debtAmount });
      showCustomers();
      showMessage('success', 'Debt recorded successfully.');
      document.getElementById('customerName').value = '';
      document.getElementById('debtAmount').value = '';
    } catch (error) {
      showMessage('error', 'Failed to record debt. Please try again.');
    }
  } else {
    showMessage('error', 'Please enter a customer name and debt amount.');
  }
}

function recordSupply() {
  const customerName = document.getElementById('supplyName').value;
  const supplyAmount = parseFloat(document.getElementById('supplyAmount').value);

  if (customerName && supplyAmount) {
    const customer = customers.find((customer) => customer.name === customerName);

    if (customer) {
      customer.supplied += supplyAmount;
      showCustomers();
      showMessage('success', 'Supply recorded successfully.');
      document.getElementById('supplyName').value = '';
      document.getElementById('supplyAmount').value = '';
    } else {
      showMessage('error', `Customer "${customerName}" not found.`);
    }
  } else {
    showMessage('error', 'Please enter a customer name and supply amount.');
  }
}

function searchCustomer() {
  const searchName = document.getElementById('searchName').value;
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
  const deleteName = document.getElementById('deleteName').value;
  const index = customers.findIndex((customer) => customer.name === deleteName);

  if (index !== -1) {
    try {
      customers.splice(index, 1);
      showCustomers();
      showMessage('success', `Customer "${deleteName}" deleted successfully.`);
      document.getElementById('deleteName').value = '';
    } catch (error) {
      showMessage('error', 'Failed to delete customer. Please try again.');
    }
  } else {
    showMessage('error', `Customer "${deleteName}" not found.`);
  }
}

function showCustomers() {
  const customersTableBody = document.getElementById('customersTableBody');
  customersTableBody.innerHTML = '';

  customers.forEach((customer) => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const suppliedCell = document.createElement('td');
    const borrowedCell = document.createElement('td');
    const balanceCell = document.createElement('td');
    const statementCell = document.createElement('td');
    const statementButton = document.createElement('button');
    statementButton.textContent = 'View Statement';
    statementButton.onclick = () => viewStatement(customer);
    nameCell.textContent = customer.name;
    suppliedCell.textContent = customer.supplied;
    borrowedCell.textContent = customer.borrowed;
    balanceCell.textContent = customer.supplied - customer.borrowed;
    statementCell.appendChild(statementButton);
    row.appendChild(nameCell);
    row.appendChild(suppliedCell);
    row.appendChild(borrowedCell);
    row.appendChild(balanceCell);
    row.appendChild(statementCell);
    customersTableBody.appendChild(row);
  });

  // Store customers data in localStorage
  try {
    localStorage.setItem('customers', JSON.stringify(customers));
  } catch (error) {
    console.error('Failed to store customers data:', error);
  }
}

function viewStatement(customer) {
  showMessage(
    'success',
    `Customer "${customer.name}" - Statement of Account:\n\nAmount Supplied: $${customer.supplied}\nAmount Borrowed: $${customer.borrowed}\nBalance Amount: $${customer.supplied - customer.borrowed}`
  );
}

function showMessage(type, message) {
  const messageContainer = document.createElement('div');
  messageContainer.className = type;
  messageContainer.textContent = message;
  document.body.insertBefore(messageContainer, document.getElementById('dashboard'));
  setTimeout(() => {
    messageContainer.remove();
  }, 3000);
}

// Retrieve customers data from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  try {
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
      customers = JSON.parse(storedCustomers);
      showCustomers();
    }
  } catch (error) {
    console.error('Failed to retrieve customers data:', error);
  }
});

// Initial setup
showDashboard();
showCustomers();
    