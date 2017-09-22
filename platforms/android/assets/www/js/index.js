
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }
};

app.initialize();

window.baseUrl = "http://introtoapps.com/datastore.php?&appid=2150289066";
window.currentUsername = null;
window.forumTopics = [];
window.forumTopics1 = [];
window.userData=[];

function checkLogin(){
    var url = baseUrl + "&action=load&objectid=userData";
    var usernameinput = document.getElementById("loginusername").value;
    var passwordinput = document.getElementById("loginpassword").value;
    var hashpasswordinput = CryptoJS.SHA256(passwordinput).toString();
    var userinput = usernameinput + hashpasswordinput;
    console.log(userinput);
        $.ajax({ url: url, cache: false })
            .done(function (data) {
                try {

                    window.userData = JSON.parse(data);
                    // do the login fuction firstly retrieve all the data
                    for (var index = 0; index < userData.length; index++) {
                        var networkdata = userData[index];
                        //set the value of password and username combination to check for this latter on
                        var userlogin = networkdata.username + networkdata.password;
                        console.log(userlogin);

                    }

                    //check if userinput name and password is a combination exist inside of database
                    if (userlogin.indexOf(userinput) >= 0 ){

                        alert("You have successfully logged in!");
                        showForumTopics();
                    }
                    else {
                        alert("Username and Password Combination are incorrect! Please try Again!");
                    }

                } catch (e){
                    alert(e);
                }
            }).fail(function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });
    }

function displayForumPage() {
    if (localStorage.index == null)
    { localStorage.index = 0; }

    for (var index = localStorage.index; index < forumTopics.length; index++) {
             var topic = forumTopics[index];
             console.log(topic);
             var ro = $("<tr></tr>");
             ro.append("<td>" + topic.title + "</td>");
             ro.append("<td>" + topic.content + "</td>");
             Table.append(ro);

    }
    localStorage.index = index;
}

     function loadForumTopics() {
         var url = baseUrl + "&action=load&objectid=forumtopics";

         $.ajax({ url: url, cache: false })
             .done(function (data) {
                 try {
                     alert("Server returned: " + data);
                     window.forumTopics = JSON.parse(data);
                     console.log(forumTopics);
                     displayForumPage();
                 } catch (e){
                     alert(e);
                 }
             }).fail(function (jqXHR, textStatus) {
                 alert("Request failed: " + textStatus);
             });
     }

function createUser(_username, _password) {
    var userObject = {
        username: _username,
        password: _password,
    }
     userData.push(userObject);
    var data = JSON.stringify(userData);
    alert("Data:" + data);
    //create url again for saving
    var url = baseUrl + "&action=save&objectid=userData&data=" + encodeURIComponent(data);
    alert("URL:" + url);

    $.ajax({ url: url, cache: false })
        .done(function (data) {
            //when success, run this
            alert("Result from server:" + data);

        }).fail(function (jqXHR, textStatus) {
            console.log("failed");
            alert("Request failed: " + textStatus);
        });
}


//insert the forum topic into database
function createForum(_title, _content) {
    //the variable

    var forumObject = {
        title: _title,
        content: _content,
    }
    console.log(forumObject);

    forumTopics.push(forumObject);
    var data = JSON.stringify(forumTopics);
    //create url again for saving
    var url = baseUrl + "&action=save&objectid=forumtopics&data=" + encodeURIComponent(data);
     $.ajax({ url: url, cache: false })
                .done(function (data) {
                    //when success, run this
                    alert("Result from server:" + data);
                    loadForumTopics();

                }).fail(function (jqXHR, textStatus) {
                    alert("Request failed: " + textStatus);
                });

}

//insert the forum topic into database
function createForum1(_title, _content) {
    //the variable

    var forumObject = {
        title: _title,
        content: _content,
    }
    console.log(forumObject);

    forumTopics1.push(forumObject);
    var data = JSON.stringify(forumTopics1);
    //create url again for saving
    var url = baseUrl + "&action=save&objectid=forumTopics1&data=" + encodeURIComponent(data);
     $.ajax({ url: url, cache: false })
                .done(function (data) {
                    //when success, run this
                    alert("Result from server:" + data);

                }).fail(function (jqXHR, textStatus) {
                    alert("Request failed: " + textStatus);
                });

}



var topics = [
{title:"Benz",posts:54},
{title:"BMW",posts:51},
];

//this is the function to load up the login page for user to login
function showLoginPage(){
    document.getElementById('Lock').style.visibility = 'visible';
    document.getElementById('loginButton').style.visibility = 'visible';
    document.getElementById('registerButton').style.visibility = 'visible';

  //add new div named page, all element will be added inside

     var page = $("<div></div>");
     page.append("<h1 class = 'logintitle'>Login page</h1>");
     var username = $("<input type='text' id='loginusername'></input>");
     var usernameLine = $("<p class='bodyfont'><b>Username: </b></p>");
     var password = $("<input type='password' id='loginpassword'></input>");
     var passwordLine = $("<p class='bodyfont'><b>Password: </b></p>");
     page.append(usernameLine);
     usernameLine.append(username);
     page.append(passwordLine);
     passwordLine.append(password);

   var loginbutton = $("<button class='button'>Login</button>");
     page.append(loginbutton);
     loginbutton.on("click",function(){
       //when the button on clicked, first table will show up
       var usernameinput = document.getElementById("loginusername").value;
       var passwordinput = document.getElementById("loginpassword").value;
       var hashpasswordinput = CryptoJS.SHA256(passwordinput).toString();

       if(usernameinput==""||passwordinput==""){
           alert("You need fill up the form!");
       }
       else{
         checkLogin();
     }

     }
   );
    //save the content to html
     $("#maincontent").html(page);
}

//the function to show the Registration page
function showRegisterPage(){

      var page = $("<div></div>");
      var registerbutton = $("<button class='button'>Submit</button>");
      page.append("<h1 class = 'logintitle'>Registration page</h1>");
      var username = $("<input type='text' id='username'></input>");
      var usernameLine = $("<p class='bodyfont'><b>Enter Your username here: </b></p>");


      var password = $("<input type='password' id='password'></input>");
      var passwordLine = $("<p class='bodyfont'><b>Enter your password here: </b></p>");

      var confirmpassword = $("<input type='password' id='confirmpassword'></input>");
      var confirmpasswordLine = $("<p class='bodyfont'><b>Confirm your password here: </b></p>");

      page.append(usernameLine);
      usernameLine.append(username);
      page.append(passwordLine);
      passwordLine.append(password);
      page.append(confirmpasswordLine);
      confirmpasswordLine.append(confirmpassword);

      page.append(registerbutton);

      registerbutton.on("click",function(){

         var usernameinput = document.getElementById("username").value;
         var passwordinput = document.getElementById("password").value;
         var confirmpasswordinput = document.getElementById("confirmpassword").value;
         //convert the password input into the hashing SHA256 and tostring
         var hashpassword = CryptoJS.SHA256(passwordinput).toString();
         console.log(hashpassword);


         //validation of if the field is empty
         if(usernameinput==""||passwordinput==""){
         alert("cannot input empty value!");
         }
         //validation of if passwordinput and confirmpasswordinput is the same
         else if (confirmpasswordinput != passwordinput) {
            alert("Password and Confirm Password must be the same value!");
         }
         else{
             //put the username and hashing password into database
             createUser(usernameinput,hashpassword);
             showLoginPage();
         }

      });
     $("#maincontent").html(page);
}



//function to handle the onclick event for user when they clicked on the table
function createTopicOnclick(node,topic){
  node.on("click",function(){
   showSingleTopic(topic);
  });
}

function showForumTopics(){
  var page = $("<div></div>");
  var edituserbutton = $("<br><br><button class='button'>Edit user</button>");
  page.append("<h1 class='logintitle'>Forum Topics</h1>");
  page.append(edituserbutton);
  var topicTable = $("<table class='topicsTable'><tr><th>Title</th><th>Posts</th></tr></table>");
  for (index in topics){
  var row = $("<tr></tr>");
  row.append("<td>" + topics[index].title + "</td>");
  row.append("<td>" + topics[index].posts + "</td>");
  createTopicOnclick(row,topics[index]);
  topicTable.append(row);

}
  page.append(topicTable);
  page.append(edituserbutton);
 $("#maincontent").html(page);
}


function showSingleTopic(topicDetails){
  if (topicDetails.title == "Benz"){
  Alltopic();
}
    if (topicDetails.title == "BMW"){
    Nexttopic();
}

}

var textarea = $("<input id='topictitle'>");
var textsarea = $("<textarea id='forumcontent' rows='5' cols='40' style='resize:none'></textarea><br>");
var StudenttopicTable = $("<table class='topicsTable' id='myTableID'><tr><th>User</th><th>Content</th><th>Edit</th></tr></table>");
var Table = $("<table class='topicsTable'><tr><th>Title</th><th>content</th></tr></table>");
var Table1 = $("<table class='topicsTable'><tr><th>Title</th><th>content</th></tr></table>");

var ro = $("<tr></tr>");
//for benz
 function Alltopic(){
    var page = $("<div></div>");
    var PresentButton = $("<button class='button'>Submit</button>");
    page.append("<h1 class='logintitle'>Benz Disscussion Part</h1>");
    page.append(Table);
    var inputone = $("<br><input id='topic'><br>");
    var inputtwo = $("<trix-editor input='content'></trix-editor><br>");

    page.append("<p class='bodyfont'>Enter Your Title here: </p>");
    page.append(inputone);
    page.append("<p class='bodyfont'>Enter Your content here: </p>");
    page.append(inputtwo);


    //set the editor into div and set up theme

    page.append(PresentButton);
   $("#maincontent").html(page);

   Table.on("click",function(){
   tableshowup();
   });


  PresentButton.on("click",function(){
      //get the value of topic input from input box
      var topicinput=document.getElementById("topic").value;
      //get the rich text input from the texteditor and using tostring function to transfer into string file.
      var contentinput= document.querySelector("trix-editor").editor.getDocument().toString();
      //remove the extra "\n" inside of content
      var newcontentinput = contentinput.replace(/\n/g,"");

      createForum(topicinput,newcontentinput);



});


}


function Nexttopic(){
   var page = $("<div></div>");
   var PresentButton = $("<button class='button'>Submit</button>");
   page.append("<h1 class='logintitle'>BMW Disscussion Part</h1>");
   page.append(Table1);
   var inputone = $("<br><input id='topic'><br>");
   var inputtwo = $("<textarea id='content' rows='5' cols='40' style='resize:none'></textarea><br>");
   page.append("<p class='bodyfont'>Enter Your Title here: </p>");
   page.append(inputone);
   page.append("<p class='bodyfont'>Enter Your content here: </p>");
   page.append(inputtwo);
   page.append(PresentButton);
   $("#maincontent").html(page);

   Table1.on("click",function(){
   tableshowup();
   });


   PresentButton.on("click",function(){

   var topicinput=document.getElementById("topic").value;
   var contentinput=document.getElementById("content").value;
   createForum1(topicinput,contentinput);
   var ro = $("<tr></tr>");
   ro.append("<td>" + topicinput + "</td>");
   ro.append("<td>" + contentinput + "</td>");
   Table1.append(ro);

   ro.on("click",function(){
   tableshowup();
   });

});


}

function tableshowup(){

  var page = $("<div></div>");
  page.append("<h1 class='logintitle'>Reply Part</h1>");
  var title = $("<p>Enter Your title here: </p>");
  var row = $("<tr></tr>");
  page.append(StudenttopicTable);
  var Submitbutton = $("<button class='button'>Reply</button>");

  page.append(StudenttopicTable);
  page.append(title);
  title.append(textarea);
  page.append("<p>Enter Your Reply here: </p>");
  page.append(textsarea);
  page.append(Submitbutton);

  Submitbutton.on("click",function(){
   add();
});

function add(){
  var b=document.getElementById("topictitle").value;
  var c=document.getElementById("forumcontent").value;
//judge if user get the empty value for input
if(b == "" || c ==""){
alert("Cannot Add Empty Value Into table, please try again!")
}
else{
var row = $("<tr></tr>");
row.append("<td>" + b + "</td>");
row.append("<td>" + c + "</td>");
row.append("<td>" + "<button class='button' onclick='edit()'>edit</button>" + "</td>");
StudenttopicTable.append(row);
createsTopicOnclick(row,Studenttopics);
var rowCount = document.getElementById('myTableID').rows.length;
var Studenttopics = {title: b,content: c,index: rowCount};
console.log(Studenttopics);
}}
$("#maincontent").html(page);
}

function edit(){
    console.log("aaa");
}

//on click function for StudenttopicTable
function createsTopicOnclick(node,Studenttopics){
  node.on("click",function(){
    var rowCount = document.getElementById('myTableID').rows.length;
});
}

function locktheapp(){
   document.getElementById('Lock').style.visibility = 'hidden';
   document.getElementById('loginButton').style.visibility = 'hidden';
   document.getElementById('registerButton').style.visibility = 'hidden';


   var page = $("<div></div>");
   var passwordLine = $("<p class='bodyfont'><b>Give App a password: </b></p>");
   var input = $("<input id='lockpassword' type='password'></input>");
   var button1 = $("<button class='button'>Submit</button>");
   page.append(passwordLine);
   passwordLine.append(input);
   page.append(button1);
   $("#maincontent").html(page);

   button1.on("click",function(){
    var lockinput = document.getElementById('lockpassword').value;
  if(lockinput==""){
      alert("Cannot Input empty value!");
  }
  else {
      localStorage.setItem('AppLockPassword',lockinput);
      console.log(lockinput);
      Unlock();
  }
   });

}

function Unlock(){

  document.getElementById('Lock').style.visibility = 'hidden';
  document.getElementById('loginButton').style.visibility = 'hidden';
  document.getElementById('registerButton').style.visibility = 'hidden';
  var page = $("<div></div>");
  var passwordLine = $("<p class='bodyfont'><b>Use password to Unlock App: </b></p>");
  var input = $("<input id='inputpassword' type='password'></input>");
  var button2 = $("<button class='button'>Submit</button>");

  page.append(passwordLine);
  passwordLine.append(input);
  page.append(button2);

  button2.on("click",function(){
   var lockinput1 = document.getElementById('inputpassword').value;
   if (lockinput1==""){
       alert("Cannot Input empty value!");
   }
   else {
       var aValue = localStorage.getItem('AppLockPassword');
       console.log(lockinput1);
       var aValue = localStorage.getItem('AppLockPassword');
       console.log(lockinput1);

       if (lockinput1 == aValue){
         alert("Correct!Welcome to John's Forum");
         showLoginPage();
       }else {
          alert("Wrong password!Try Again!!");
       }


   }
      });



  $("#maincontent").html(page);

}



//web application load
$( document ).ready(function() {
$("#loginButton").on("click", showLoginPage);
$("#registerButton").on("click", showRegisterPage);
$("#Lock").on("click", Unlock);
locktheapp();
});
