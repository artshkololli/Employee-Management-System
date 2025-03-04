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

//EMPLOYEE LIST

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
employeeList.appendChild(ul);

const addEmployeeHandler = (name,dept,salary)=>{
    let li=document.createElement('li');
    li.className="employee-li-item";
    let employeeName = document.createElement('div');
    employeeName.className="employee-name"
    let employeeNameText = document.createTextNode("Art");
    let employeeDep = document.createElement('div');
    employeeDep.className="employee-department";
    let employeeDepText = document.createTextNode("IT");
    let employeeSalary = document.createElement('div');
    employeeDep.className="employee-salary";
    let employeeSalaryText = document.createTextNode("600");
    employeeName.appendChild(employeeNameText);
    employeeDep.appendChild(employeeDepText);
    employeeSalary.appendChild(employeeSalaryText);
    li.appendChild(employeeName);
    li.appendChild(employeeDep);
    li.appendChild(employeeSalary);
    ul.appendChild(li);
}

let addEmployees=document.getElementById("addEmployeeBtn");


