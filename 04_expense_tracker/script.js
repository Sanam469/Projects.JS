const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");
const totalDiv = document.getElementById("total");
const totalAmount = document.getElementById("total-amount");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Save to localStorage
function save() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Render expense list
function renderList() {
  let total = 0;
  expenseList.innerHTML = "";

  expenses.forEach((expense) => {
    total += Number(expense.price);
    const li = document.createElement("li");
    li.innerHTML = `${expense.name} - $${expense.price}
      <button data-id="${expense.id}">Delete</button>`;
    expenseList.appendChild(li);
    totalAmount.textContent = total;
  });
}

// Add new expense
expenseForm.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "BUTTON") {
    const productName = expenseName.value.trim();
    const expensePrice = parseInt(expenseAmount.value);

    if (productName === "" || expensePrice < 0 || isNaN(expensePrice)) return;

    const product = {
      name: productName,
      id: Date.now(),
      price: expensePrice,
    };

    expenses.push(product);
    save();
    renderList();

    expenseName.value = "";
    expenseAmount.value = "";
  }
});

// Delete using event delegation
expenseList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.dataset.id;
    expenses = expenses.filter((item) => String(item.id) !== String(id));
    save();
    renderList();
  }
});

// Initial render
renderList();
