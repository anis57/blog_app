import {auth, signOut,onAuthStateChanged,db,set,ref,get,remove,update,storage,storageRef,uploadBytes,getDownloadURL} from "../firebase.js"

let logout_btn = document.getElementById("logout-btn")
let loader = document.getElementById("loader");
let image = document.getElementById('image');

let upload = document.getElementById('get_btn')


const logout = ()=>{
    loader.style.display = 'flex';
    signOut(auth).then(() => {
        
        loader.style.display = 'none';
        Toastify({

            text: `Logout Successfully`,
            
            duration: 3000
            
            }).showToast();
            
      }).catch((error) => {
        loader.style.display = 'none';
      });
}

logout_btn.addEventListener("click",logout )

onAuthStateChanged(auth, (user) => {
    if (!user) {
        setTimeout(() => {

        
          window.location.href = '../index.html'
           }, 300); 
     
    }else{
        document.body.style.display = 'block';
    }
    });

    // image uplaod
    const uploadFile = () => {
        return new Promise((resolve, reject) => {
            const files = image.files[0];
            const imagesRef = storageRef(storage, `images/${files.name}`);
            
            
            uploadBytes(imagesRef, files).then((snapshot) => {
            
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL); 
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    };

    
    


    // blog section code

    const addblog = async () => {
        event.preventDefault();
        loader.style.display = 'flex';
        let title = document.getElementById('title').value;
        let content = document.getElementById('content').value;
        const id = Math.floor(Math.random() * 100);
    
        try {
            
            const imageUrl = await uploadFile();
    
        
            await set(ref(db, 'post/' + id), {
                title: title,
                content: content,
                image: imageUrl 
            });
            loader.style.display = 'none';
    
            Toastify({
                text: "Blog added successfully!",
                duration: 3000,
            }).showToast();
    
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
            document.getElementById('image').value = '';
            getData();
    
        } catch (error) {
            loader.style.display = 'none';
            console.error("Error adding blog:", error);
        }
    };
    
    add_btn.addEventListener("click", addblog);

    // Get data from firebase

  function getData (){
 const user_ref = ref(db,'post/')
 get(user_ref).then((fetch)=>{
    const data = fetch.val()
    
   let html = '';
   const table = document.querySelector('table');

   for(const key in data){
    const {title,content} = data [key]

    html+= `
    <tr>

     <td> <span class"serial"></span></td>
      <td>${title}</td>
      <td><button class ='delete' onclick= "delete_data(${key})">Delete</button></td>
      <td><button class = 'update' onclick= "update_data(${key})">update</button></td>
       
    </tr>
    
    `
   }

   table.innerHTML = html
})
    }

    getData()
   
    // delete data

    window.delete_data = function(key){
        remove(ref(db, `post/${key}`)).then(() => {
            
            Toastify({
                text: "Blog deleted successfully!",
                duration: 3000, 
               
            }).showToast();
        getData()
    });
};
    
// get and update data 

window.update_data = function (key){
    const user_ref = ref(db, `post/${key}`);

    get(user_ref).then((item)=>{
        document.querySelector('#title').value = item.val().title
        document.querySelector('#content').value = item.val().content
        
    })
   

        const update_btn = document.querySelector('.update_btn');
        update_btn.classList.add(`show`)

        document.querySelector('.add_btn').classList.add("hide");


       

        function update_form(){
          const title = document.querySelector('#title').value
          const content =  document.querySelector('#content').value


          update(ref(db, `post/${key}`), {
            
            title: title,
            content: content
            
        }).then(() => {
            

            
            Toastify({
                text: "Blog updated successfully!",
                duration: 3000, 
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "#4caf50",
            }).showToast();
        
            getData(); 
        }).catch((error) => {
            console.error("Error updating blog:", error);
        });

    }

     update_btn.addEventListener('click', update_form)
}


