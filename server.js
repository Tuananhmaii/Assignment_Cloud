const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require("body-parser")
const path = require('path');
const connectDB = require('./connection');
const controller = require('./server/controller/controller');
const { Router } = require('express');
const route = express.Router();
const axios = require('axios')
const { auth, requiresAuth } = require('express-openid-connect');

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
  
// log requests 
app.use(morgan("tiny"));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended : true}))

// set view engine
app.set("view engine","ejs")

// load assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

// Make request to api/toys
app.get('/index',(req,res)=>{
    axios.get('https://r0pindalowkey.herokuapp.com/api/toys')
    .then(function(response){
        res.render('index',
        {
            toys:response.data
        })
    })
    .catch(err=>{
        res.send(err)
    })
})

app.get('/add',(req,res)=>{
    res.render('add');
})


app.get('/update',(req,res)=>{
    axios.get('https://r0pindalowkey.herokuapp.com/api/toys',{params:{id:req.query.id}})
    .then(function(userdata){
        res.render("update",{toys:userdata.data})
    })
    .catch(err=>{
        res.send.apply(err);
    })
})

app.use('/', require('./server/routes/router'))

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'https://r0pindalowkey.herokuapp.com',
    clientID: 'LKuZ7y0A1MmOokeFKq2ce3XBwmAm58Px',
    issuerBaseURL: 'https://dev-vc3sf5hx.us.auth0.com'
  };
  
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/authenticate', (req, res) => {
  console.log(req.oidc.isAuthenticated());
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/', requiresAuth(), (req, res) => {
    res.render('secured',{
        title: 'Secure Page',
        isAuthenticated: req.oidc.isAuthenticated(),
        user :req.oidc.user
    })
    console.log(user);
})
