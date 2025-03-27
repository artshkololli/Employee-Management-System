let createForm=document.getElementById('createForm');
let editForm=document.getElementById('editForm');
let employeeName=document.getElementById('name');
let department=document.getElementById('department');
let salary=document.getElementById('salary');
let filterDep=document.getElementById('departmentFilter');
let sortFilter=document.getElementById('sortFilter');

let nameEdit=document.getElementById("nameEdit");
let departmentEdit=document.getElementById("departmentEdit");
let salaryEdit=document.getElementById("salaryEdit");

let cancelEditBtn=document.getElementById('cancelEdit')
let addModal=document.getElementById("addModal");
let editModal=document.getElementById("editEmpModal");
let deleteModal=document.getElementById("deleteEmpModal");
let deleteCancelBtn=document.getElementById("cancelDeleteBtn");
let cancelBtn=document.getElementById("cancelBtn");
let deleteBtn=document.getElementById("deleteBtn");

let isClicked=false;
let isDeleteClicked=false;
let isEdit=false;

const showModal=()=>{
    if(!isClicked){
        document.getElementById("empModal").style.display="block";
        isClicked=true;
        addModal.innerHTML="Close";
        addModal.style.display="none";
    }else{
        hideModal()
    }
}

const hideModal=()=>{
    document.getElementById("empModal").style.display="none";
    addModal.innerHTML="Add Employeee";
    addModal.style.display="block";
    isClicked=false;
}

const deleteEmpModal=(id)=>{
    async function deleteEmployeeHandler() {
        try {
            let response = await fetch(`http://localhost:3000/employees/${id}`, {
                method: "DELETE",
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
    if(!isDeleteClicked){
        deleteModal.style.display="block";
        isDeleteClicked=true;
    }else{
        cancelDeleteModal()
    }
    deleteBtn.addEventListener('click',deleteEmployeeHandler);

}

const cancelDeleteModal=()=>{
    deleteModal.style.display="none";
    isDeleteClicked=false;
}
//Edit

const editEmpModal=(id)=>{
    async function editHandler(e) {
        e.preventDefault();
        let nameInput=nameEdit.value;
        let departmentInput=departmentEdit.value;
        let salaryInput=salaryEdit.value;

        const employee={
            id:id,
            name:nameInput,
            department:departmentInput,
            salary:salaryInput,
        }
        try{    
            const res=await fetch(`http://localhost:3000/employees/${id}`,{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(employee)
            });console.log("Employee Edited");
            hideModal();
        }catch(err){
            console.log(err);
        }
        
        readList();
    }

    if(!isEdit){
        editModal.style.display="block";
        isEdit=true;
    }else{
        cancelEditModal();
        isEdit=false
    }

    editForm.addEventListener('submit', editHandler);

}

const cancelEditModal=()=>{
    editModal.style.display="none";
}

deleteCancelBtn.addEventListener('click',deleteEmpModal);
cancelEditBtn.addEventListener('click',cancelEditModal);
addModal.addEventListener('click',showModal);
cancelBtn.addEventListener('click',hideModal);
//Sort
const sortList=(e)=>{
    e.preventDefault();
    fetch('http://localhost:3000/employees')
    .then(res=> {return res.json();})
    .then(data=>{
        const tableBody = document.getElementById("list");
        tableBody.innerHTML=""
        if(e.target.value==="Name"){
            data.sort((a, b) => a.name.localeCompare(b.name)).forEach((emp)=>{
                let tableRow=document.createElement('tr');
                tableRow.innerHTML=`
                    <td>${emp.name}</td>
                    <td>${emp.department}</td>
                    <td>${emp.salary}€</td>
                    <td><button class="tableBtn" onclick="editEmpModal('${emp.id}')">Edit</button><button class="tableBtn" onclick="deleteEmpModal('${emp.id}')">Delete</button></td>
                `
                tableBody.appendChild(tableRow);
            });
        }else if(e.target.value==="Salary"){
            data.sort((a, b) => a.salary.localeCompare(b.salary)).reverse().forEach((emp)=>{
                let tableRow=document.createElement('tr');
                tableRow.innerHTML=`
                    <td>${emp.name}</td>
                    <td>${emp.department}</td>
                    <td>${emp.salary}€</td>
                    <td><button class="tableBtn" onclick="editEmpModal('${emp.id}')">Edit</button><button class="tableBtn" onclick="deleteEmpModal('${emp.id}')">Delete</button></td>
                `
                tableBody.appendChild(tableRow);
            });
        }else{
            data.sort((a, b) => a.department.localeCompare(b.department)).forEach((emp)=>{
                let tableRow=document.createElement('tr');
                tableRow.innerHTML=`
                    <td>${emp.name}</td>
                    <td>${emp.department}</td>
                    <td>${emp.salary}€</td>
                    <td><button class="tableBtn" onclick="editEmpModal('${emp.id}')">Edit</button><button class="tableBtn" onclick="deleteEmpModal('${emp.id}')">Delete</button></td>
                `
                tableBody.appendChild(tableRow);
            });
        }
    })
}
sortFilter.addEventListener('change', sortList)
//Filter
const filterList=(e)=>{
    e.preventDefault();
    fetch('http://localhost:3000/employees')
    .then(res=> {return res.json();})
    .then(data=>{
        const tableBody = document.getElementById("list");
        tableBody.innerHTML=""
        let filteredEmp=data.filter((emp)=>{
            return emp.department===e.target.value;
        })
        if(e.target.value!=="All"){
            filteredEmp.forEach((emp)=>{
                let tableRow=document.createElement('tr');
                tableRow.innerHTML=`
                    <td>${emp.name}</td>
                    <td>${emp.department}</td>
                    <td>${emp.salary}€</td>
                    <td><button class="tableBtn" onclick="editEmpModal('${emp.id}')">Edit</button><button class="tableBtn" onclick="deleteEmpModal('${emp.id}')">Delete</button></td>
                `
                tableBody.appendChild(tableRow);
            });
        }else{
            data.forEach((emp)=>{
                let tableRow=document.createElement('tr');
                tableRow.innerHTML=`
                    <td>${emp.name}</td>
                    <td>${emp.department}</td>
                    <td>${emp.salary}€</td>
                    <td><button class="tableBtn" onclick="editEmpModal('${emp.id}')">Edit</button><button class="tableBtn" onclick="deleteEmpModal('${emp.id}')">Delete</button></td>
                `
                tableBody.appendChild(tableRow);
            });
        }
    })
}
        
filterDep.addEventListener('change', filterList)

const readList=()=>{
    fetch('http://localhost:3000/employees')
    .then(res=> {return res.json();})
    .then(data=>{
        const tableBody = document.getElementById("list");
        tableBody.innerHTML=""
        data.forEach((emp)=>{
            let tableRow=document.createElement('tr');
            tableRow.innerHTML=`
                <td>${emp.name}</td>
                <td>${emp.department}</td>
                <td>${emp.salary}€</td>
                <td><button class="tableBtn" onclick="editEmpModal('${emp.id}')">Edit</button><button class="tableBtn" onclick="deleteEmpModal('${emp.id}')">Delete</button></td>
            `
            tableBody.appendChild(tableRow);
        });
        localStorage.setItem('employeeData',JSON.stringify(data));
    })
}

readList()

let nameErr=document.getElementById('nameErr');
let departmentErr=document.getElementById('departmentErr');
let salaryErr=document.getElementById('salaryErr');


async function createHandler(e) {
    e.preventDefault();
    let nameInput=employeeName.value;
    let departmentInput=department.value;
    let salaryInput=salary.value;
    
    if(nameInput === '' && departmentInput === '' && salaryInput === ''){
        nameErr.innerText="Field cannot be empty!";

        departmentErr.innerText="Field cannot be empty!";

        salaryErr.innerText="Field cannot be empty!";

    }else if(nameInput === '' || nameInput.trim().length <2 || nameInput.match(/[0-9]/)){
        nameErr.innerText="Name must contain atleast 2 letters and no numbers!";
    }else if(departmentInput === '' || departmentInput.trim().length <2 || departmentInput.match(/[0-9]/)){
        departmentErr.innerText="Field cannot contain any numbers!";
    }else{
        nameErr.innerText=""
        departmentErr.innerText=""
        salaryErr.innerText=""

            const employee={
                name:nameInput,
                department:departmentInput,
                salary:salaryInput,
            }
            try{    
                const res=await fetch('http://localhost:3000/employees',{
                    method:'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(employee)
                });
                console.log("Employee Created");
                
                hideModal();
            }catch(err){
                console.log(err);
            }
            readList();
    }
}

hideModal();
cancelDeleteModal();
cancelEditModal();

createForm.addEventListener('submit', createHandler);
window.addEventListener('load', readList);

//Sidebar

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

//Logout

const logoutBtn=document.getElementById('logout');
let user=document.getElementById('profile');

let userName=JSON.parse(localStorage.getItem('users'))[0].name

user.innerText=`Hello ${userName}`

const logoutHandler=()=>{
    window.location.replace('http://127.0.0.1:5500/src/index.html')
    console.log("Hello");
}

logoutBtn.addEventListener('click', logoutHandler);
