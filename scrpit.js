// Funkcija za dohvat zaposlenika iz localStorage
function getEmployees() {
  const employees = localStorage.getItem("employees");
  return employees ? JSON.parse(employees) : [];
}

// Funkcija za spremanje zaposlenika u localStorage
function saveEmployees(employees) {
  localStorage.setItem("employees", JSON.stringify(employees));
}

// Funkcija za prikaz zaposlenika u tablici
function displayEmployees() {
  const employees = getEmployees(); // Dohvati sve zaposlenike
  const employeeList = document.getElementById("employeeList");
  employeeList.innerHTML = ""; // Očisti trenutnu listu zaposlenika

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

// Funkcija za dodavanje novog zaposlenika
document
  .getElementById("addEmployeeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Sprječava učitavanje stranice pri slanju forme

    // Dohvati podatke iz forme
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    // Dohvati postojeće zaposlenike iz localStorage
    const employees = getEmployees();

    // Dodaj novog zaposlenika u listu
    employees.push({ firstName, lastName, email, address, phone });

    // Spremi novu listu zaposlenika u localStorage
    saveEmployees(employees);

    // Prikaz novih zaposlenika
    displayEmployees();

    // Zatvori modal nakon dodavanja
    $("#addEmployeeModal").modal("hide"); // Automatski zatvori modal

    // Očisti formu za unos za sljedeći unos
    document.getElementById("addEmployeeForm").reset();

    // Prikaz popisa zaposlenika
    $("#employeeListTab").tab("show"); // Prebaci na tab s popisom zaposlenika
  });

// Funkcija za brisanje zaposlenika
function deleteEmployee(index) {
  const employees = getEmployees();
  employees.splice(index, 1); // Ukloni zaposlenika na index poziciji
  saveEmployees(employees); // Spremi novu listu u localStorage
  displayEmployees(); // Ponovno prikaži zaposlenike
}

// Funkcija za uređivanje zaposlenika
function editEmployee(index) {
  const employees = getEmployees();
  const employee = employees[index];

  // Popuni formu s podacima zaposlenika
  document.getElementById("firstName").value = employee.firstName;
  document.getElementById("lastName").value = employee.lastName;
  document.getElementById("email").value = employee.email;
  document.getElementById("address").value = employee.address;
  document.getElementById("phone").value = employee.phone;

  // Sakrij gumb za dodavanje i prikaži gumb za spremanje promjena
  document.getElementById("addEmployeeButton").style.display = "none";
  document.getElementById("saveChangesButton").style.display = "inline-block";

  // Spremi index zaposlenika koji se uređuje
  document.getElementById("saveChangesButton").onclick = function () {
    // Dohvati nove podatke iz forme
    const updatedEmployee = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      phone: document.getElementById("phone").value,
    };

    // Ažuriraj zaposlenika u listi
    employees[index] = updatedEmployee;

    // Spremi ažurirane podatke u localStorage
    saveEmployees(employees);

    // Prikaz ažuriranih zaposlenika
    displayEmployees();

    // Zatvori modal
    $("#addEmployeeModal").modal("hide");

    // Očisti formu i vrati gumbove u početno stanje
    document.getElementById("addEmployeeForm").reset();
    document.getElementById("addEmployeeButton").style.display = "inline-block";
    document.getElementById("saveChangesButton").style.display = "none";
  };
}

// Pozivanje funkcije za prikaz zaposlenika pri učitavanju stranice
displayEmployees();
