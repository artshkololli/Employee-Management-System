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

const registerHandler=(e)=>{
    e.preventDefault();
    const name=document.getElementById("registerName").value;
    const email=document.getElementById("registerEmail").value;
    const password=document.getElementById("registerPassword").value;

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

const loginHandler=(e)=>{
    e.preventDefault();
    const email=document.getElementById("loginEmail").value;
    const password=document.getElementById("loginPassword").value;

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

