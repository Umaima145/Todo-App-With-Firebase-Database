const firebaseConfig = {
    apiKey: "AIzaSyA2AlRnqZEXnAq4sOlxzvTqyu6O2jo9_eo",
    authDomain: "webtest-cfd49.firebaseapp.com",
    databaseURL: "https://webtest-cfd49-default-rtdb.firebaseio.com",
    projectId: "webtest-cfd49",
    storageBucket: "webtest-cfd49.appspot.com",
    messagingSenderId: "924627300840",
    appId: "1:924627300840:web:6d8c4445e9cffa3f07345d"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  var db = firebase.database()


firebase.database().ref("todos").on("child_added",function(data){
    var liElement = document.createElement("li");
  
    var liText = document.createTextNode(data.val().value);
    
   
    
      liElement.appendChild(liText);
     liElement.setAttribute("class","text")
     //EDIT BTN START
     var editbtn = document.createElement("button");
  
     var editbtnText = document.createTextNode("Edit");
   
     editbtn.appendChild(editbtnText);
   
     liElement.appendChild(editbtn);
   
     editbtn.setAttribute("onclick", "editItem(this)");
     editbtn.setAttribute("class","edit")

     editbtn.setAttribute("id", data.val().key)
     //EDIT BTN END
   
   //DEL BTN START
    var delbtn = document.createElement("button");
  
    var delbtnText = document.createTextNode("Delete");
  
    delbtn.appendChild(delbtnText);
  
    delbtn.setAttribute("onclick", "deleteItem(this)");

    delbtn.setAttribute("id", data.val().key);

    liElement.appendChild(delbtn);
    delbtn.setAttribute("class","delete")
     //DEL BTN END
  
  
  
    var list = document.getElementById("list");
  
    list.appendChild(liElement);
  
    
    
   

})



function addtodo() {
    var input = document.getElementById("input");
     var key = Date.now().toString(25)
    var todos= {
        value: input.value,
        key,
    }
    firebase.database().ref("todos/" + key).set(todos)

   
   input.value = "";
    
  }
  
  function deleteAll(){
      var list = document.getElementById("list");
      firebase.database().ref("todos").remove()
      list.innerHTML=""

      
  };
  
  
  
  function editItem(e){
    var update= prompt("Edit the task", e.parentNode.firstChild.nodeValue )
    firebase.database().ref(`todos/ ${e.id}`).set({
        key:e.id,
        value:update,

    });
    e.parentNode.firstChild.nodeValue = update
  };

function deleteItem(e){

firebase.database().ref(`todos/${e.id}`).remove()
e.parentNode.remove()
}
  