let employeeCount=document.getElementById('employeeCount');
let ticketCount=document.getElementById('ticketCount');

fetch('http://localhost:3000/employees')
    .then(res=> {return res.json();})
    .then(data=>{
        employeeCount.innerHTML=data.length;
    });
fetch('http://localhost:3000/tickets')
    .then(res=> {return res.json();})
    .then(data=>{
        ticketCount.innerHTML=data.length;
    });
    
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
