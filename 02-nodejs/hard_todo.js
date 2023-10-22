const express = require('express');
const bodyParser = require('body-parser');
const port=3000;
const app = express();
const fs=require('fs');

app.use(bodyParser.json());

//1st part
function retrieve(req,res){
  fs.readFile('todo.json','utf-8',(err,data)=>{
    if(err){
        console.log(err);
        return;
    }
    res.status(200).send(data);
  })
}

//2nd part
function retrieveAll(req,res){
  var ids=parseInt(req.params.id);
  fs.readFile('todo.json','utf-8',(err,data)=>{
    if(err){
        console.log(err);
        return;
    }
    var data_new=JSON.parse(data);
    if(ids>=0 && ids<=data_new.length-1)
   res.status(200).send(data_new[ids]);
   else
   res.status(404).send("Error");
  })
  
}

//3rd part
function addnew(req,res){
  var obj=req.body;
  fs.readFile('todo.json','utf-8',(err,data)=>{
    if(err){
        console.log("Error");
        return;
    }
    var data_new=JSON.parse(data);
    data_new.push(obj);
    var obj_return={
        id:data_new.length-1
    }
    data_new1=JSON.stringify(data_new,null,2);
    fs.writeFile('todo.json',data_new1,(err)=>{
        if(err)
        {
            console.log("Error")
            return;
        }
    })
    res.status(201).send(obj_return);
  })
}

//4th part
function update(req,res){
  let ids=parseInt(req.params.id)
  var obj_update=req.body;
  fs.readFile('todo.json','utf-8',(err,data)=>{
    if(err){
        console.log("Error")
        return;
    }
    var data_update=JSON.parse(data);
    if(ids>=0 && ids<=data_update.length-1){
        data_update[ids]=obj_update;
        res.status(200).send("Updated");
      }
      else{
        res.status(404).send("Error");
      }
      data_updatenew=JSON.stringify(data_update,null,4);
      fs.writeFile('todo.json',data_updatenew,(err)=>{
        if(err){
            console.log("Error")
            return;
        }
      })
  })
}

//5th part
function del(req,res){
let ids=parseInt(req.params.id);
fs.readFile('todo.json','utf-8',(err,data)=>{
    if(err){
        console.log("Error");
        return;
    }
    var delete_data1=JSON.parse(data);
    if(ids>=0 && ids<=delete_data1.length-1){
        delete_data1.splice(ids,1);
        var delete_data2=JSON.stringify(delete_data1,null,2);
        fs.writeFile('todo.json',delete_data2,(err)=>{
            if(err){
                console.log("Error")
                return;
            }
            res.status(200).send("Deleted");
        })
      }
      else
      res.status(404).send("Error");
})
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