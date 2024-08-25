import {auth, signOut,onAuthStateChanged,get,ref,db} from "./firebase.js"

const signup_btn = document.getElementById("signup_btn");
const login_btn = document.getElementById("login_btn");
const logout_btn = document.getElementById("logout_btn");
const add_blog = document.getElementById("add_blog");



onAuthStateChanged(auth, (user) => {
    if (user) {
       
        signup_btn.style.display = "none";
        login_btn.style.display = "none";
        logout_btn.style.display = "inline-block";
    } else {
        
        signup_btn.style.display = "inline-block";
        login_btn.style.display = "inline-block";
        logout_btn.style.display = "none";




        add_blog.href = "#";
        add_blog.addEventListener("click", () => {
            Toastify({
                text: "Please log in to continue",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "#f44336",
            }).showToast();
        });
    }
});


logout_btn.addEventListener("click", () => {
    signOut(auth).then(() => {
        Toastify({

            text: `Logout Successfully`,
            
            duration: 3000
            
            }).showToast();
            
      }).catch((error) => {
      });
});




function getData (){
    const user_ref = ref(db,'post/')
    get(user_ref).then((fetch)=>{
       const data = fetch.val()
       
      let html = '';
      if (data) {
   
      for(const key in data){
       const {title,content,image} = data [key]
   
       html+= `
       
         <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 pb-4 pt-5">
                    <div class="card">
                        <img src="${image}" class="card-img-top" alt="${title}">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${content}</p>
                            <a href="#" class="btn btn-primary">Read more</a>
                        </div>
                    </div>
                </div>
       `
      }
         document.getElementById('card-container').innerHTML = html;
    
        document.getElementById('no-blogs-message').style.display = 'none';
    }else{
        document.getElementById('card-container').innerHTML = '';
        document.getElementById('no-blogs-message').style.display = 'block';
    }
   
    }).catch((error) => {
        console.error("Error fetching data: ", error);
    });
}
getData();