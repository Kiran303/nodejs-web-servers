const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log' , log + '\n', (err) =>{
        if(err){
            console.log('Unable to add Log');
         }
    });
    next();
});

// app.use((req,res,next) =>{
//     res.render('maintenance.ejs');
// });

app.set('view engine',ejs);

app.use(express.static(__dirname + '/public'));


app.get('/', (req,res)=>{
     //res.send('<h1>HEllo Express..!</h1>');
     res.send({
        Name: 'Kiran',
        likes :[
            'Biking',
            'Pulser',
            'Scooty'
        ] 
     });
});

app.get('/home',(req,res) =>{
    res.render('home.ejs',{
        name :'Kiran',
        pageTitle : 'Home Page',
        message :'Welcome to Home page',
        currentyear : new Date().getFullYear()
    })
});

app.get('/about',(req,res)=>{
    res.render('about.ejs',{
        pageTitle : 'About Page',
        currentyear : new Date().getFullYear()
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to handle request'
    });
});

app.listen(port ,()=>{
    console.log(`Port is starting on ${port}`);
});

