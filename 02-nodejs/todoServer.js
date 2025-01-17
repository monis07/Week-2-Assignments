/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require('express');
const bodyParser = require('body-parser');
const port=3000;
const app = express();

app.use(bodyParser.json());

var arr=[
  {
    title:"Book",
    description:"Need to buy a book from market"
  },
  {
    title:"Milk",
    description:"Need to buy a book from Milk"
  },
  {
    title:"Shop",
    description:"Go to a shop"
  }
]


//1st part
function retrieve(req,res){
  res.status(200).send(arr);
}

//2nd part
function retrieveAll(req,res){
  var found=false;
  var ids=parseInt(req.params.id);
  if(ids>=0 && ids<=arr.length-1)
   res.status(200).send(arr[ids]);
   else
   res.status(404).send("Error");
}

//3rd part
function addnew(req,res){
  var obj=req.body;
  console.log(obj);
  arr.push(obj);
  console.log(arr);
  var obj1={
    id:arr.length-1
  }
  console.log(obj1);
  res.status(201).send(obj1);
}

//4th part
function update(req,res){
  let ids=parseInt(req.params.id)
  if(ids>=0 && ids<=arr.length-1){
    var obj1=req.body;
    arr[ids]=obj1;
    console.log(arr);
    res.status(200).send("Updated");
  }
  else{
    res.status(404).send("Error");
  }
}

//5th part
function del(req,res){
let ids=parseInt(req.params.id);
if(ids>=0 && ids<=arr.length-1){
  arr.splice(ids,1);
  console.log(arr);
  res.status(200).send("Deleted");
}
else
res.status(404).send("Error");
}

app.get('/todos',retrieve)
app.get('/todos/:id',retrieveAll)
app.post('/todos',addnew)
app.put('/todos/:id',update)
app.delete('/todos/:id',del)

// app.listen(port,()=>{
//   console.log('Listening on '+port);
// })
module.exports = app;
