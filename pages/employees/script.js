// SIDEBAR TOGGLE

let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}

//Add MODAL

let addEmployeeModal = document.getElementById('addEmployee');
let modal=document.getElementById('addModal');

let clicked=false;

const addModalHandler=()=>{
  
  if(!clicked){
    modal.style.display='block';
  }else{
    clicked=false
  }
}

addEmployeeModal.addEventListener('click',addModalHandler);

//EMPLOYEE LIST

let employees = [];

let employeeList = document.getElementById("employee-list");
let body=document.body;

let ul=document.createElement('ul');
ul.className="employee-ul";
let li=document.createElement('li');
li.className="employee-li";
let employeeName = document.createElement('div');
employeeName.className="employee-name"
let employeeNameText = document.createTextNode('Name');
let employeeDep = document.createElement('div');
employeeDep.className="employee-department";
let employeeDepText = document.createTextNode('Department');
let employeeSalary = document.createElement('div');
employeeDep.className="employee-salary";
let employeeSalaryText = document.createTextNode('Salary');

employeeName.appendChild(employeeNameText);
employeeDep.appendChild(employeeDepText);
employeeSalary.appendChild(employeeSalaryText);
li.appendChild(employeeName);
li.appendChild(employeeDep);
li.appendChild(employeeSalary);
ul.appendChild(li);
employeeList.appendChild(ul)

const addEmployeeHandler = ()=>{
  clicked=true;
  let nameInput=document.getElementById('nameId').value;
  let departmentInput=document.getElementById('departmentId').value;
  let salaryInput=document.getElementById('salaryId').value;

  let employee = {name:nameInput,department:departmentInput,salary:salaryInput};

  let li=document.createElement('li');
  li.className="employee-li";
  let employeeName = document.createElement('div');
  employeeName.className="employee-name"
  let employeeNameText = document.createTextNode(nameInput);
  let employeeDep = document.createElement('div');
  employeeDep.className="employee-department";
  let employeeDepText = document.createTextNode(departmentInput);
  let employeeSalary = document.createElement('div');
  employeeDep.className="employee-salary";
  let employeeSalaryText = document.createTextNode(salaryInput);

  employeeName.appendChild(employeeNameText);
  employeeDep.appendChild(employeeDepText);
  employeeSalary.appendChild(employeeSalaryText);
  li.appendChild(employeeName);
  li.appendChild(employeeDep);
  li.appendChild(employeeSalary);
  ul.appendChild(li);

  employees.push(employee);
  console.log(employees);
  modal.style.display="none";
}

let addEmployees=document.getElementById("addEmployeeBtn");
addEmployees.addEventListener('click',addEmployeeHandler)

//FILTER

// let nameFilter=document.getElementById("nameFilter");
// addEmployees.addEventListener('click',filterByName);

// let departmentFilter=document.getElementById("departmentFilter");
// addEmployees.addEventListener('click',filterByDepartment);

// let salaryFilter=document.getElementById("salaryFilter");
// addEmployees.addEventListener('click',filterBySalary);


