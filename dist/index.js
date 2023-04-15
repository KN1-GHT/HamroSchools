
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

//Web app configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWNJlveRIBDvyndNJvusr6F9DTuastqH0",
    authDomain: "final-year-project-ab272.firebaseapp.com",
    databaseURL: "https://final-year-project-ab272-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "final-year-project-ab272",
    storageBucket: "final-year-project-ab272.appspot.com",
    messagingSenderId: "712666019588",
    appId: "1:712666019588:web:cd58ac429a92ccd83f8251"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);
  
  const submit = document.getElementById("UserInfo")
  submit.addEventListener("submit",(event)=>{
    event.preventDefault()
    register()
    })
  //Setting up my register function
   function register (){
     //Getting all the input fields
     email = document.getElementById('email').value
     password = document.getElementById('password').value
     full_name = document.getElementById('full_name').value
    console.log(email)

     //Validate input fields
     if(validate_email(email)==false || validate_password(password)==false){
        alert('Email or password is incorrect. Please try again.')
        return
        //Don't continue running the code
     }
     if(validate_field(full_name)==false)
     alert('The field cannot be left empty.')
     return
   }
   //Authentication
   auth.createUserWithEmailAndPassword(email,password)
   .then(function(){

    var user = auth.currentUser
    console.log(user)
    //Add this to the database
    var database_ref = database.ref()
    //Create User Data
    var user_data = {
        email : email,
        full_name : full_name,
        password : password,
        last_login : Date.now()
    }
    database_ref.child('users/' + user.uid).set(user_data)




    alert('User Created')

   })
   .catch(function(error){
    //Firebase will use this to alert of errors
    var error_code = error.code
    var error_message = error.message
    alert(error_message)
   })

   function validate_email(email){
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if(expression.test(email)==true){
        //Email is good
        return true
    } else{
        //Email is not good
        return false
    }
   }

   function validate_password(password){
    //Firebase only accepts lengths greater than six
    if (password<6){
        return false
    } else {
        return true
    }
   }

   function validate_field(field){
    if (field == null){
        return false
    }
    if (field.length<=0){
        return false
    } else {
        return true
    }
   }