/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */

const express = require("express")
const port = 3000;
const app = express();
const fs=require('fs')
const bodyParser = require('body-parser');
const crypto=require('crypto');
const jwt=require('jsonwebtoken');

app.use(bodyParser.json());

//1st part

function signup(req,res){
  fs.readFile('user_data.json','utf-8',(err,data)=>{
    if(err){
      console.error(err)
      return;
    }
    var data_signup=JSON.parse(data);
    let length=data_signup.length;
    var written=false;
    if(length!==0){
      data_signup.forEach(element => {
        if(element.username===req.body.username)
        {
          res.status(400).send("Username already exits");
          written=true;
        }
      });
    }
    if(written===false){
    data_signup.push(req.body);
    var data_signup1=JSON.stringify(data_signup,null,2);
      fs.writeFile('user_data.json',data_signup1,(err)=>{
        if(err){
          console.error(err);
        }
      })
    res.status(201).send("Account created successfully")
    }
  })
}

function generateToken(length){
  return crypto.randomBytes(length).toString('hex');
}



function login(req,res){
  var valid=false;
  var credentials=req.body;
  fs.readFile('user_data.json','utf-8',(err,data)=>{
    if(err){
      console.error(err);
      return;
    }
    var all_data=JSON.parse(data);
    all_data.forEach(element => {
      if(element.username===credentials.username && element.password===credentials.password){
        var secretkey=generateToken(32);
        var usern=element.username;
        var response={
        username:element.username,
        firstName:element.firstName,
        lastName:element.lastName,
        token:jwt.sign({usern},secretkey)
        }
        valid=true;
        res.status(200).send(response);
        return;
      }
    });
    if(valid===false)
  res.status(401).send("Invalid credentials");
  })
  
}

// function authenticateUser(req,res,next){
//   var data=req.body;

// }

// // function data(req,res){

// // }

app.post('/signup',signup)
app.post('/login',login)
// app.get('/data',authenticateUser)

app.listen(port,()=>{
  console.log("Listening at "+port);
})


module.exports = app;
