
let customers = [
  { name: "John Doe", supplied: 2000, borrowed: 1000 },
  { name: "Jane Smith", supplied: 1500, borrowed: 500 },
  { name: "David Johnson", supplied: 3000, borrowed: 2000 },
  { name: "Emily Davis", supplied: 2500, borrowed: 1500 }
];
let loggedIn = false;

function createAccount() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) {
    // Implement account creation logic here
    showMessage('success', 'Account created successfully. Please login.');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  } else {
    showMessage('error', 'Please enter a username and password.');
  }
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) {
    // Implement login logic here
    loggedIn = true;
    showDashboard();
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
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
    customers.push({ name: customerName, supplied: 0, borrowed: debtAmount });
    showCustomers();
    showMessage('success', 'Debt recorded successfully.');
    document.getElementById('customerName').value = '';
    document.getElementById('debtAmount').value = '';
  } else {
    showMessage('error', 'Please enter a customer name and debt amount.');
  }
}

function searchCustomer() {
  const searchName = document.getElementById('searchName').value;
  const result = customers.find(customer => customer.name === searchName);

  if (result) {
    showMessage('success', `Customer "${result.name}" found. Amount Supplied: $${result.supplied}, Amount Borrowed: $${result.borrowed}, Balance Amount: $${result.supplied - result.borrowed}`);
  } else {
    showMessage('error', `Customer "${searchName}" not found.`);
  }
}

function deleteCustomer() {
  const deleteName = document.getElementById('deleteName').value;
  const index = customers.findIndex(customer => customer.name === deleteName);

  if (index !== -1) {
    customers.splice(index, 1);
    showCustomers();
    showMessage('success', `Customer "${deleteName}" deleted successfully.`);
    document.getElementById('deleteName').value = '';
  } else {
    showMessage('error', `Customer "${deleteName}" not found.`);
  }
}

function showCustomers() {
  const customersTableBody = document.getElementById('customersTableBody');
  customersTableBody.innerHTML = '';

  customers.forEach(customer => {
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
}

function viewStatement(customer) {
  showMessage('success', `Customer "${customer.name}" - Statement of Account:\n\nAmount Supplied: $${customer.supplied}\nAmount Borrowed: $${customer.borrowed}\nBalance Amount: $${customer.supplied - customer.borrowed}`);
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

// Initial setup
showDashboard();  
showCustomers();
