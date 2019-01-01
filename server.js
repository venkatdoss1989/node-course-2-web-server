const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));          // Express Middleware

/* Express Middleware */

app.use((req,res,next) => {
    
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=> {
        if(err){
            console.log('Unable to connect to server.')
        }
    });
    next();
});

// app.use((req,res,next) => {

//     res.render('maintenance.hbs');
// });


hbs.registerHelper('getCurrentYear', () => {
         return new Date().getFullYear()

});


app.get('/',(req,res) => {
   
    // res.send('<h1>Hello Express!!!</h1>');                  // Sending HTML file
       
    //    res.send({                                              // Sending JSON file
    //        name : ' S R Venkadesh ',
    //        likes : ['chatting','foody','studying']
    //    });

    res.render('home.hbs', {

        pageTitle : 'Home Page',
        welcomeMessage : 'Welcoming everyone on this occasion'

    });

});

app.get('/about',(req,res) => {

    res.render('about.hbs',{
        pageTitle : 'Rendering About Page',
    });
   
    //res.send('It is about the contents of the page');

});


app.get('/bad',(req,res) => {
   
    res.send({
        errorMess : 'Unable to Fulfill your request'
    });

});


app.listen(port, () => { 
    console.log(`Server is up on port ${port}`);
});