var fire, user;

window.addEventListener("load", function(){
   fire = new Firebase("https://torrid-torch-9856.firebaseio.com/");

   user = fire.getAuth();

   if(user == null){
     document.getElementById("loggedin").className = "hiddenLink";
   } else{
     document.getElementById("loggedout").className = "hiddenLink";
   }

   document.getElementById("loginbutt").addEventListener("click", login, false);
   document.getElementById("logoutbutt").addEventListener("click", logout, false);

}, false);

function login(){
  fire.authWithOAuthPopup('facebook', function(e, a){
    if(!e){
      console.log(a);
      location.href = location.href;
    }
  });
}

function logout(){
  fire.unauth();
  
}
