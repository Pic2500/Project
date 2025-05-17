// Dohvat zaposlenika iz localStorage
function getEmployees() {
  const employees = localStorage.getItem("employees");
  return employees ? JSON.parse(employees) : [];
}

// Spremanje zaposlenika u localStorage
function saveEmployees(employees) {
  localStorage.setItem("employees", JSON.stringify(employees));
}

// Prikaz zaposlenika u tablici
function displayEmployees() {
  const employees = getEmployees();
  const employeeList = document.getElementById("employeeList");
  employeeList.innerHTML = "";

  employees.forEach((employee, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.firstName}</td>
      <td>${employee.lastName}</td>
      <td>${employee.email}</td>
      <td>${employee.address}</td>
      <td>${employee.phone}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editEmployee(${index})">Uredi</button>
        <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${index})">Obriši</button>
      </td>
    `;
    employeeList.appendChild(row);
  });
}

// Dodavanje novog zaposlenika
document
  .getElementById("addEmployeeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    const employees = getEmployees();
    employees.push({ firstName, lastName, email, address, phone });
    saveEmployees(employees);
    displayEmployees();

    // Zatvori modal i resetiraj formu
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("addEmployeeModal")
    );
    modal.hide();
    document.getElementById("addEmployeeForm").reset();
  });

// Brisanje zaposlenika
function deleteEmployee(index) {
  const employees = getEmployees();
  employees.splice(index, 1);
  saveEmployees(employees);
  displayEmployees();
}

// Otvaranje modala za uređivanje s popunjenim podacima
function editEmployee(index) {
  const employees = getEmployees();
  const employee = employees[index];

  document.getElementById("editIndex").value = index;
  document.getElementById("editFirstName").value = employee.firstName;
  document.getElementById("editLastName").value = employee.lastName;
  document.getElementById("editEmail").value = employee.email;
  document.getElementById("editAddress").value = employee.address;
  document.getElementById("editPhone").value = employee.phone;

  const editModal = new bootstrap.Modal(
    document.getElementById("editEmployeeModal")
  );
  editModal.show();
}

// Spremanje promjena nakon uređivanja
document
  .getElementById("editEmployeeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const index = document.getElementById("editIndex").value;
    const employees = getEmployees();

    employees[index] = {
      firstName: document.getElementById("editFirstName").value,
      lastName: document.getElementById("editLastName").value,
      email: document.getElementById("editEmail").value,
      address: document.getElementById("editAddress").value,
      phone: document.getElementById("editPhone").value,
    };

    saveEmployees(employees);
    displayEmployees();

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("editEmployeeModal")
    );
    modal.hide();
    document.getElementById("editEmployeeForm").reset();
  });

// Prikaz zaposlenika kod učitavanja
displayEmployees();
