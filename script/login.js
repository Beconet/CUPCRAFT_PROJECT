var username ,password;
var wrong = document.getElementById("required_text");
var loader = document.getElementById("preloader");
var form = document.getElementById('myForm');
window.addEventListener("load",function(){
    setTimeout(() => {
        loader.style.display = "none";
      }, "1000");
    
});


function clickLogin(){
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    console.log("Username : ", username);
    console.log("Password : ",password);
    if(username == "" || password == ""){
        wrong.innerHTML = "UserName or Password is incorrect";
        wrong.style.color = "red";
    }else{
        wrong.innerHTML = "";
        console.log("Login"); 
        if(username == "admin" && password == "123"){
            wrong.innerHTML = "";
            form.addEventListener('submit',function(event){
                event.preventDefault();   
                window.location.href = "main_page.html";
            });
        }else{
            wrong.innerHTML = "UserName or Password are Wrong, Please try again.";
            alert("UserName or Password are Wrong, Please try again.");
            wrong.style.color = "red";
        }
    }
}