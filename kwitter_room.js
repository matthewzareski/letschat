
//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
      apiKey: "AIzaSyAPyyw7-uVrTOg_PATti-Kb5VE3VNx0qpI",
      authDomain: "kwitter-1219c.firebaseapp.com",
      databaseURL: "https://kwitter-1219c-default-rtdb.firebaseio.com",
      projectId: "kwitter-1219c",
      storageBucket: "kwitter-1219c.appspot.com",
      messagingSenderId: "466220643678",
      appId: "1:466220643678:web:521aeefff5a9bf88360bcf"
    };
    
    // Initialize Firebase
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    user_name = localStorage.getItem("user");

    document.getElementById("user").innerHTML = "Welcome " + user_name + "!";

    function add_room()
    {
          room_name = document.getElementById("room_name").value;

          firebase.database().ref("/").child(room_name).update({
                purpose : "adding room name"
          });

          localStorage.setItem("room_name", room_name);

          window.location = "kwitter_page.html";
    }

    function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
       console.log("Room Name - " + Room_names);
       row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
       document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirectToRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}
function send(){
      msg = document.getElementById("message").value;
      firebase.database().ref(room_name).push({
      name:user_name,
      message:msg,
      like:0
      });
      document.getElementById("message").value="";
      console.log("Message is sent!");
}

function updateLike(message_id){
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      update_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : update_likes
      });
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeitem("room_name");
      window.location.replace("index.html");
}
