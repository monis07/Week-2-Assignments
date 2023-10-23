const express = require('express');
const bodyParser = require('body-parser');
const port=3000;
const app = express();
const fs=require('fs');


app.use(bodyParser.json());




//2nd part
// function retrievespecific(req,res){
//   var ids=parseInt(req.params.id);
//   fs.readFile('todo.json','utf-8',(err,data)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     var data_new=JSON.parse(data);
//     if(ids>=0 && ids<=data_new.length-1)
//    res.status(200).send(data_new[ids]);
//    else
//    res.status(404).send("Error");
//   })
  
// }

//3rd part
function addnew(req,res){
  var obj=req.body;
  fs.readFile('todo.json','utf-8',(err,data)=>{
    if(err){
        console.error("Error");
        return;
    }
    var data_new=JSON.parse(data);
    data_new.push(obj);
    var data_new1=JSON.stringify(data_new,null,2);
    fs.writeFile('todo.json',data_new1,(err)=>{
        if(err)
        {
            console.log("Error")
            return;
        }
    })
    res.status(201).sendFile(__dirname+'/todo.json');
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





//   app.get('/', (req, res) => {
//     const htmlContent = `
//     <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>TO do app</title>
// </head>
// <body>
//     <form action="http://localhost:3000/todos" method="post">
//         <p>
//         <label for="title">Title</label>
//         <input type="text" id="title" name="title" placeholder="Title" autocomplete="on" autofocus>
//         </p>
        
//         <p>
//         <label for="description">Description</label>
//         <input type="text" id="description" name="description" placeholder="description" autocomplete="on">
//         </p>
        
//         <button id="fetch_new" type="submit" onclick="onPress()">Add new To-do</button>
//         </form>

//         <ul>
//             ${require('./todo.json').map(todo => `<li>${todo.title}: ${todo.description}</li>`).join('')}
//             </ul>
// </body>
// </html>
//     `;

//     res.send(htmlContent);
// });
app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/index.html');
})

app.post('/todos',addnew)
// app.put('/todos/:id',update)
// app.delete('/todos/:id',del)



app.listen(port,()=>{
  console.log('Listening on '+port);
})
module.exports = app;