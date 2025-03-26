let createForm=document.getElementById('createForm');
let department=document.getElementById('department');
let issue=document.getElementById('issue');
let statusOption=document.getElementById('status');
let addTicketModal=document.getElementById('addTicket');
let cancelTicketModal=document.getElementById('cancelBtn');
let cancelEditBtn=document.getElementById('cancelEdit');
let editModal=document.getElementById("editTicketModal");

let departmentEdit=document.getElementById('departmentEdit');
let issueEdit=document.getElementById('issueEdit');
let statusEdit=document.getElementById('statusEdit');

let isClicked=false;
let isEdit=false;

const showModal=()=>{
    if(!isClicked){
        document.getElementById("ticketModal").style.display="block";
        addTicketModal.style.display="none";
        isClicked=true;
    }else{
        hideModal()
    }
}

const hideModal=()=>{
    document.getElementById("ticketModal").style.display="none";
    addTicketModal.style.display="block";
    isClicked=false;
}

const showList=()=>{
    fetch('http://localhost:3000/tickets')
    .then(res=> {return res.json();})
    .then(data=>{
        const tableBody = document.getElementById("ticketList");
        tableBody.innerHTML="";
        data.forEach((ticket)=>{
            let tableRow=document.createElement('tr');
            tableRow.innerHTML=`
                <td>#${ticket.id}</td>
                <td>${ticket.department}</td>
                <td>${ticket.issue}</td>
                <td></span>${ticket.status}</td>
                <td><button class="tableBtn" onclick="editTicketModal('${ticket.id}')">Edit</button><button class="tableBtn" onclick="deleteTicketHandler('${ticket.id}')">Delete</button></td>
            `
            tableBody.appendChild(tableRow);
            if(ticket.status=="Open"){
                tableRow.style.backgroundColor="lightgreen"
            }else if(ticket.status=="Pending"){
                tableRow.style.backgroundColor="lightyellow"
            }else if(ticket.status=="Closed"){
                tableRow.style.backgroundColor="lightblue"
            }
            else{
                tableRow.style.backgroundColor="red"
            }
        });
    })
}

showList();

async function createHandler(e) {
    e.preventDefault();
    let departmentInput=department.value;
    let issueInput=issue.value;
    let statusInput=statusOption.value
    const ticket={
        department:departmentInput,
        issue:issueInput,
        status:statusInput
    }
    try{    
        const res=await fetch('http://localhost:3000/tickets',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(ticket)
        });console.log("Ticket Created");
    }catch(err){
        console.log(err);
    }
    showList();
}

async function deleteTicketHandler(id) {
    try {
        let response = await fetch(`http://localhost:3000/tickets/${id}`, {
            method: "DELETE",
        });
        console.log("Ticket Deleted");
    } catch (err) {
        console.log(err);
    }
}

const editTicketModal=(id)=>{
    async function editHandler(e) {
        e.preventDefault();
        let departmentInput=departmentEdit.value;
        let issueInput=issueEdit.value;
        let statusInput=statusEdit.value;
    
        const ticket={
            id:id,
            department:departmentInput,
            issue:issueInput,
            status:statusInput
        }
        try{    
            const res=await fetch(`http://localhost:3000/tickets/${id}`,{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(ticket)
            });console.log("Ticket Edited");
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
        isEdit=false;
    }

    editForm.addEventListener('submit', editHandler);

}

const cancelEditModal=()=>{
    editModal.style.display="none";
}

hideModal();
cancelEditModal();

cancelEditBtn.addEventListener('click',cancelEditModal);
addTicketModal.addEventListener('click',showModal);
cancelTicketModal.addEventListener('click',hideModal)
createForm.addEventListener('submit', createHandler);
window.addEventListener('load', showList);

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