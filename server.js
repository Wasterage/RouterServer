const mysql = require('mysql');
const express=require('express');
const cors = require('cors');
var app=express();
const bodyparser=require('body-parser');

app.use(cors());
app.use(bodyparser.json());

//Establish connection with mysql
var con = mysql.createConnection({
  host: "localhost",
  user: "devabhi",
  password: "",
  database: "route"
});

//Return connection status
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//Define Port
app.listen(8081,()=>
console.log('Server started at port 8081')
);

//Define table
const table='/bin';

//CREATE
app.post(table,(req,res)=>{
  let specs=req.body;
  console.log(req.body);
  con.query("INSERT INTO route.bin SET ?",specs,(err,rows,fields)=>{
  if(err) throw err;
  res.send(JSON.stringify(rows))
  })
})

//READ
app.get(table+'/:id',(req,res)=>{
  con.query('SELECT cor from bin where `id`=?',[req.params.id],(err,rows,fields)=>{
    if(err) throw err;
    res.json(rows);
  })
})
