const express = require("express");
const path = require("path");

const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactdance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port = 8000;

//define schema
const contactSchema = new mongoose.Schema({
  name:String,
  phone:String,
  email:String,
  adress:String,
  desc:String

  });

  const contact = mongoose.model('contact', contactSchema);

//express specific
app.use('/static',express.static('static'))
app.use(express.urlencoded())

//pug specific
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

//endpoints

app.get('/',(req,res)=>{
    
    const params ={}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    
    const params ={}
    res.status(200).render('contact.pug',params);
})
app.post('/contact',async (req,res)=>{
    
  const mydata = new contact(req.body);
  await mydata.save().then(()=>{
    res.send("this item has been saved to database")
  }).catch(()=>{
    res.status(400).send("item was not saved to the database")
  })
  res.status(200).render('contact.pug',params);
})

//start server
app.listen(port,()=>{
    console.log(`the application started successfuly on port ${port}`);
})