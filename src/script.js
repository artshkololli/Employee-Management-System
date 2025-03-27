// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC341yFejxMNitv8kc5HbRVhIwoMOwkFlY",
    authDomain: "employee-management-syst-1e27f.firebaseapp.com",
    projectId: "employee-management-syst-1e27f",
    storageBucket: "employee-management-syst-1e27f.firebasestorage.app",
    messagingSenderId: "682414482856",
    appId: "1:682414482856:web:304d7e268fc679b00b699d",
    measurementId: "G-KV2JJZZM25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

const registerForm=document.getElementById("registerForm");
const loginForm=document.getElementById("loginForm");

const registerLink=document.getElementById("registerLink");
const loginLink=document.getElementById("loginLink");

const registerContainer=document.getElementById("register-container");
const loginContainer=document.getElementById("login-container");
const loginAndRegister=document.getElementById("login-register");

let nameErr=document.getElementById('nameErr');
let emailErr=document.getElementById('emailErr');
let passwordErr=document.getElementById('passwordErr');
let emailLoginErr=document.getElementById('emailLoginErr');
let passwordLoginErr=document.getElementById('passwordLoginErr');

const registerHandler=(e)=>{
    e.preventDefault();
    const name=document.getElementById("registerName").value;
    const email=document.getElementById("registerEmail").value;
    const password=document.getElementById("registerPassword").value;

    if(name === '' && email === '' && password === ''){
        nameErr.innerText="Field cannot be empty!";

        emailErr.innerText="Field cannot be empty!";

        passwordErr.innerText="Field cannot be empty!";

    }else if(name === '' || name.trim().length <2 || name.match(/[0-9]/)){
        nameErr.innerText="Name must contain atleast 2 letters and no numbers!";
    }else if(email === '' || email.trim().length <6 || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        emailErr.innerText="Please enter a valid email!";
    }else if(password === '' || password.trim().length <8 || !password.match((/\d/)) || !password.match(/[^A-Za-z0-9]/)){
        passwordErr.innerText="Must be 8 characters , numbers ,symbols!";
    }else{
        nameErr.innerText=""
        emailErr.innerText=""
        passwordErr.innerText=""

        const userData={name:name,email:email,password:password};
    
        let users=[]
    
        users.push(userData);
        localStorage.setItem("users",JSON.stringify(users));
    
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            registerContainer.style.display="none";
            loginContainer.style.display="flex";
            
            console.log("User Registered!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

}

const loginHandler=(e)=>{
    e.preventDefault();
    const email=document.getElementById("loginEmail").value;
    const password=document.getElementById("loginPassword").value;

    if(email === '' && password === ''){
        emailLoginErr.innerText="Field cannot be empty!";
        passwordLoginErr.innerText="Field cannot be empty!";
    }else if(email === '' || email.trim().length <6 || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        emailLoginErr.innerText="Please enter a valid email!";
    }else if(password === '' || password.trim().length <8 || !password.match((/\d/)) || !password.match(/[^A-Za-z0-9]/)){
        passwordLoginErr.innerText="Must be 8 characters , numbers ,symbols!";
    }else{
        emailLoginErr.innerText=""
        passwordLoginErr.innerText=""
        
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            loginAndRegister.style.display="none";
            console.log("User Logged In!");
            window.location.replace("../pages/dashboard/index.html")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }
}

const registerRedirect=()=>{
    loginContainer.style.display="none";
    registerContainer.style.display="flex";
}

const loginRedirect=()=>{
    registerContainer.style.display="none";
    loginContainer.style.display="flex";
}

registerForm.addEventListener('submit',registerHandler);
loginForm.addEventListener('submit',loginHandler);
registerLink.addEventListener('click',registerRedirect)
loginLink.addEventListener('click',loginRedirect)

