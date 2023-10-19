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

app.listen(port,()=>{
  console.log('Listening on '+port);
})
module.exports = app;