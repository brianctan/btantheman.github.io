var fire, user;

window.addEventListener("load", function(){
   fire = new Firebase("https://torrid-torch-9856.firebaseio.com/");

   user = fire.getAuth();

   if(user == null){
     document.getElementById("loggedin").className = "hiddenLink";
   } else{
     document.getElementById("loggedout").className = "hiddenLink";
   }
}, false);

function login(){
  fire.authWithOAuthPopup('facebook', function(e, a){
    if(!e){
      console.log(a);
      location.href = location.href;
    }
  });
}
