const express = require("express");
const path = require("path");

const app = express();
const port = 8000;

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

//start server
app.listen(port,()=>{
    console.log(`the application started successfuly on port ${port}`);
})