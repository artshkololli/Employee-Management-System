let createForm=document.getElementById('createForm');
let employeeName=document.getElementById('name');
let department=document.getElementById('department');
let salary=document.getElementById('salary')

let addModal=document.getElementById("addModal");
let deleteModal=document.getElementById("deleteEmpModal");
let deleteCancelBtn=document.getElementById("cancelDeleteBtn");
let cancelBtn=document.getElementById("cancelBtn");

let isClicked=false;
let isDeleteClicked=false;

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

const showDeleteModal=()=>{
    if(!isDeleteClicked){
        deleteModal.style.display="block";
        isDeleteClicked=true;
    }else{
        cancelDeleteModal()
    }
}

const cancelDeleteModal=()=>{
    deleteModal.style.display="none";
    isDeleteClicked=false;
}

addModal.addEventListener('click',showModal);
cancelBtn.addEventListener('click',hideModal);
deleteCancelBtn.addEventListener('click',showDeleteModal);

const readList=()=>{
    fetch('http://localhost:3000/employees')
    .then(res=> {return res.json();})
    .then(data=>{
        const tableBody = document.getElementById("list");
        tableBody.innerHTML="";
        data.forEach((emp)=>{
            let tableRow=document.createElement('tr');
            tableRow.innerHTML=`
                <td>${emp.name}</td>
                <td>${emp.department}</td>
                <td>${emp.salary}</td>
                <td><button class="tableBtn">Update</button><button class="tableBtn" onclick="showDeleteModal()">Delete</button></td>
            `
            tableBody.appendChild(tableRow);
    });
    })
}

readList()

async function createHandler(e) {
    e.preventDefault();
    let nameInput=employeeName.value;
    let departmentInput=department.value;
    let salaryInput=salary.value;

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
        });console.log("Employee Created");
        hideModal();
    }catch(err){
        console.log(err);
    }
    
    readList();
}

hideModal();
cancelDeleteModal();

createForm.addEventListener('submit', createHandler);
window.addEventListener('load', readList);

//eCommerce

const cardContainer=document.getElementById('eComerce');
const checkoutModal=document.getElementById('checkout-modal');
const checkoutContainer=document.getElementById("checkout-item");
const creditForm=document.getElementById("creditForm");
let ul=document.createElement('ul');
let heading=document.getElementById('cardTitle');
let description=document.getElementById('cardDesc');
const btn=document.getElementById("createBtn");


const title=document.getElementById("titleId");
const imageFile=document.getElementById("fileId");
const image=document.getElementById("imgId");
const price=document.getElementById("priceId")

let isCheckout=false;

let orders=[];

const createPost=(e)=>{
    e.preventDefault()
    const file=imageFile.files[0];
    console.log(file);
    const renderImg=new FileReader();
    renderImg.onload=(e)=>{
        e.preventDefault();
        console.log(e);
        const base64Img=e.target.result;
        const postData={
            title:heading.value,
            description:description.value,
            price:price.value,
            image:base64Img
        }
        fetch('http://localhost:3000/employees',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(postData)
        }).then(res=>{
            return res.json()
        }).then(data=>{
            console.log(data);
        })
    }
    renderImg.readAsDataURL(file);
}

const getData=()=>{
    fetch('http://localhost:3000/employees')
    .then(res=> res.json())
    .then(data=>{
        data.forEach(item=>{
            let list=document.createElement("li");
            let card=document.createElement("div");
            card.className="card-container";
            let cardImg=document.createElement('img');
            cardImg.src=item.image;
            let cardTitle=document.createElement('h2');
            cardTitle.innerHTML=`${item.title}`;
            let cardPrice=document.createElement('h2');
            cardPrice.innerHTML=`${item.price}€`;
            let cardDesc=document.createElement('textarea');
            cardDesc.innerHTML=`${item.description}`;
            let btnContainer=document.createElement('div');
            btnContainer.className="btn-container";
            let buyBtn=document.createElement('button');
            let buyBtnText=document.createTextNode('Buy Now');
            let viewBtn=document.createElement('button');
            let viewBtnText=document.createTextNode('View More');
            cardContainer.appendChild(ul);
            ul.appendChild(list);
            list.appendChild(card);
            card.appendChild(cardImg);
            card.appendChild(cardTitle);
            card.appendChild(cardPrice);
            card.appendChild(cardDesc);
            card.appendChild(btnContainer);
            btnContainer.appendChild(buyBtn);
            btnContainer.appendChild(viewBtn);
            buyBtn.appendChild(buyBtnText);
            viewBtn.appendChild(viewBtnText);
            console.log(data);
                
            const checkoutItem=()=>{
                fetch('http://localhost:3000/employees/'+ item.id)
                .then(res=> res.json())
                .then(data=>{
                    if(data.id===item.id){
                        checkoutContainer.innerHTML=`
                            <div>
                                <ul>
                                    <li>
                                        <div>
                                            <img src="${data.image}" style="height:100px">
                                            <h2>${data.title}</h2>
                                            <h2>Total:${data.price}€</h2>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        `
                    }
                })
                if(!isCheckout){
                    checkoutModal.style.display="block"
                    isCheckout=true;
                }else{
                    checkoutHandler();
                }
            }
            viewBtn.addEventListener('click' , ()=>{
                window.location.href=`singleProduct.html?id=${item.id}`;
            })
            buyBtn.addEventListener('click',checkoutItem);
        })
    })
}

const checkoutHandler=()=>{
    checkoutModal.style.display="none";
    isCheckout=false;
}

getData();

checkoutHandler();

creditForm.addEventListener('submit',checkoutHandler)
btn.addEventListener('click',createPost)