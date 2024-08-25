import {auth, signInWithEmailAndPassword,onAuthStateChanged} from "../firebase.js"

let formField = document.querySelectorAll('form input')

const [userEmail , userPassword] = formField

let login_btn = document.getElementById('login-btn');
let loader = document.getElementById("loader");

const login = () =>{
    event.preventDefault()
    loader.style.display = 'flex'; 

    signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
  .then((userCredential) => {
    
    const user = userCredential.user;
    loader.style.display = 'none';
    Toastify({

        text: `Login Successfully`,
        
        duration: 3000
        
        }).showToast();
    
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    loader.style.display = 'none';
    Toastify({

        text: `Invalid Email or Password`,
        
        duration: 3000
        
        }).showToast();
  });

}

login_btn.addEventListener("click", login)
onAuthStateChanged(auth, (user) => {
    if (user) {
    setTimeout(() => {

     window.location.href = '../Dashboard/dashboard.html'
    }, 300); 

    }else{
      document.body.style.display = 'block';
  }
    });
