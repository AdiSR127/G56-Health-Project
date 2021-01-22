const express = require('express');
const mongoose = require('mongoose');
const bobyparser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');
const ptb = require("./patient_tb");

app.use(bobyparser.urlencoded({extended: true}));

//Connection with mondgoDB
mongoose.connect("mongodb://localhost:27017/g56", { useNewUrlParser: true , useUnifiedTopology: true})
.then(() => console.log("DB Connected"))
.catch((err) => console.log(err));


//Static Path
const staticPath = path.join(__dirname, "../public");
app.set('view engine', 'hbs');
app.use(express.static(staticPath));

//home page
app.get('/', (req, res) => {
  res.render("index", );
});

//patient login
app.get("/patient",(req, res) =>{
  res.render("patient");
})

//staff login
app.get("/staff",(req, res) =>{
  res.render("staff");
})


//Validator for Patients
app.post("/validP", async(req, res) => {
  try{
    const pid = req.body.pid;
    const pass = req.body.pass;
    const userid = await ptb.findOne({pid:pid});

    if(userid.pass === pass){
      res.status(201).render("dashboard",{
        name: userid.name,
      });
    }else{
      res.render("patient",{
        msg: "Invalid Login Details",
      })
    }
  } catch(error){
    res.render("patient",{
      msg: "Invalid Login Details",
    });
  }
});
    


//For 404 error
app.get("*",(req, res) =>{
  res.render("404");
});

//Listening port
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});