import {auth, createUserWithEmailAndPassword,onAuthStateChanged} from "../firebase.js"

let formField = document.querySelectorAll('form input')
let loader = document.getElementById("loader");

const [userEmail , userPassword] = formField

let signUp_btn = document.getElementById('signUp-btn')

const signUp = ()=>{
    event.preventDefault()
    loader.style.display = 'flex'; 

   
    createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
    .then((userCredential) => {
      
      const user = userCredential.user;
      loader.style.display = 'none';
      Toastify({

        text: `Registered Successfully`,
        
        duration: 3000
        
        }).showToast();
      console.log(user);
      setTimeout(() => {
        window.location.href = '../Dashboard/dashboard.html';
    }, 1000); 
      
    })
    .catch((error) => {
        const errorCode = error.code;
        let errorMessage = "";

        
        switch (errorCode) {
            case 'auth/email-already-in-use':
                errorMessage = "This email is already registered. Please try logging in.";
                break;
            case 'auth/invalid-email':
                errorMessage = "The email address is not valid. Please enter a valid email.";
                break;
            case 'auth/weak-password':
                errorMessage = "The password is too weak. It must be at least 6 characters long.";
                break;
            default:
                errorMessage = error.message; 
                break;
        }
        loader.style.display = 'none';
        Toastify({
            text: errorMessage,
            duration: 3000
        }).showToast();
    });
    
}

signUp_btn.addEventListener('click', signUp)

onAuthStateChanged(auth, (user) => {
    if (user) {
        setTimeout(() => {

           window.location.href = '../Dashboard/dashboard.html'
           }, 300); 
     
    }else{
        document.body.style.display = 'block';
    }
    });