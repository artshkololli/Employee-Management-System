//Charts

fetch('http://localhost:3000/employees')
    .then(res=> {return res.json();})
    .then(data=>{

      let xValues=[];
      let yValues=[];
      data.forEach(item => {
        yValues.push(item.name);
        xValues.push(item.salary);
      });

      let barColors = ["green","blue","orange","brown","pink","yellow","grey","red","black","lightblue","skyblue"];

      new Chart("myChart", {
        type: "bar",
        data: {
          labels: yValues,
          datasets: [{
            backgroundColor: barColors,
            data: xValues
          }]
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
          },
          legend: {display: false},
          title: {
            display: true,
            text: "Employee Salaries"
          },
        }
      });
    });
fetch('http://localhost:3000/employees')
.then(res=> {return res.json();})
.then(data=>{

  let itDepCount=0;
  let hrDepCount=0;
  let financeDepCount=0;
  let salesDepCount=0;
  let yValues=["IT","HR","Finance","Sales"];
  data.forEach(item => {
    if(item.department==="IT"){
      itDepCount++;
    }else if(item.department==="HR"){
      hrDepCount++;
    }else if(item.department==="Finance"){
      financeDepCount++;
    }else{
      salesDepCount++;
    }
  });

fetch('http://localhost:3000/employees')
  .then(res=> {return res.json();})
  .then(data=>{
    let salaryData=0;
    let count=0;
    data.forEach(item=>{
      count++;
      salaryData += parseInt(item.salary);
    })

    let maxSalary =data.sort((a,b)=>a.salary-b.salary)[data.length - 1]
    let minSalary =data.sort((a,b)=>b.salary-a.salary)[data.length - 1]

    averageSalary=salaryData/count;
    document.getElementById('averageSalary').innerText=`Average Salary: ${Math.round(averageSalary).toFixed(2)}€`
    document.getElementById('highestSalary').innerText=`Highest Salary: ${maxSalary.name} ${Math.round(parseInt(maxSalary.salary)).toFixed(2)}€`
    document.getElementById('lowestSalary').innerText=`Lowest Salary: ${minSalary.name} ${Math.round(parseInt(minSalary.salary)).toFixed(2)}€`
  });

  document.getElementById('itData').innerHTML=itDepCount;
  document.getElementById('hrData').innerHTML=hrDepCount;
  document.getElementById('financeData').innerHTML=financeDepCount;
  document.getElementById('salesData').innerHTML=salesDepCount;

  let xValues=[itDepCount,hrDepCount,financeDepCount,salesDepCount];


  let barColors = ["green","blue","orange","brown"];
  new Chart("myPieChart", {
    type: "pie",
    data: {
      labels: yValues,
      datasets: [{
        backgroundColor: barColors,
        data: xValues
      }]
    },
    options: {
      title: {
        display: true,
        text: "No.of Employees by Department"
      }
    }
  });
})
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