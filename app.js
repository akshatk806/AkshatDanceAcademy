// Creating the dance website

const express=require('express');  
// const fs=require('fs');
const path=require('path');
const port=8000;           
const app=express();
const mongoose = require('mongoose');
const bodyparser=require('body-parser');       //body parser is middleware

mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    email:String,
    phone:String,
    address:String
});
const Contact = mongoose.model('Contact', contactSchema);



app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(request,response)=>{
    const params={};
    response.status(200).render('home.pug',params);
});

app.get('/contact',(request,response)=>{
    const params={};
    response.status(200).render('contact.pug',params);
});

app.post('/contact',(request,response)=>{
    var myData=new Contact(request.body);
    myData.save().then(()=>{                 // .save returns a promise
        response.send("This item has been saved to database");
    }).catch(()=>{
        response.status(404).send("Item was not save to the database");
    });
});

app.listen(port,()=>{
    console.log("The server is up and running on port:",port);
});