var fire, user, slideIndex = 0, slidetext;

var slideTexts = [
  "Hang with friends.",
  "Meet with teachers. ",
  "Schedule a meeting."
];

window.addEventListener("load", function(){
   fire = new Firebase("https://torrid-torch-9856.firebaseio.com/");

   user = fire.getAuth();

   if(user == null){
     document.getElementById("loggedin").className = "hiddenLink";
   } else{
     document.getElementById("loggedout").className = "hiddenLink";
   }

  slidetext = document.getElementById("slidetext");

   document.getElementById("loginbutt").addEventListener("click", function(){login(false);}, false);
   document.getElementById("logoutbutt").addEventListener("click", logout, false);

}, false);

function login(x){
  fire.authWithOAuthPopup('facebook', function(e, a){
    if(e){
      fire.authWithOAuthRedirect('facebook', function(e, a){
        if(!e){
          fire.on("value", function(s){
            console.log(s.val().accounts[a.facebook.id]);
            if(s.val().accounts[a.facebook.id] == null && (x == false || x == null)){
              window.location.href = "signup.html";
            } else{
              location.reload();
            }
          });
        }
      });
    }
    if(!e){
      fire.on("value", function(s){
        console.log(s.val().accounts[a.facebook.id]);
        if(s.val().accounts[a.facebook.id] == null && (x == false || x == null)){
          window.location.href = "signup.html";
        } else{
          location.reload();
        }
      });
    }
  }, {scope: 'email,user_friends'});
}

function logout(){
  fire.unauth();
  location.reload();
}
