require('dotenv').config()

const express=require("express")
const app=express()
const path=require('path')
const port=process.env.PORT || 3000
const hbs=require("hbs")
const auth=require('./Middleware/auth')

//package.json a giye thn scripts er under a 
//"start":" node app.js"
//"devs": nodemon app.js

//connect mongodb student-api database
require('./db/connection.js')



 
//to get json data from postamn
app.use(express.json())
//connect mongodb student-api database end

//Get data from ui

app.use(express.urlencoded({extended:false}))
// ui data end
//get routing module
const routers=require("./Router/routers")

//use  express router

app.use(routers)

//Run Static page
const staticpath=path.join(__dirname, './Public')

//app.use(express.static(staticpath))
//Run Static page end

//run dynamic page

//set view engine

//Render Dynamic Page with views name change into template
app.set('view engine','hbs')
const templatepath=path.join(__dirname,'./template/views')
app.set("views",templatepath)

//Render Dynamic Page end

//partial start

//Partial use korbo public folder er index ,about file ta fetch 
//korarjonno views folder er index.hbs ,about.hbs a
const partialpath=path.join(__dirname,'./template/partials')
hbs.registerPartials(partialpath)
//partial end


app.get('/',(req,res)=>{
  res.render('index')
})

app.get('/registration',(req,res)=>{
  res.render('registration')
})

app.get('/login',(req,res)=>{
  res.render('login')
})

//cookie parser to get token which is stored in cookie
var cookieParser = require('cookie-parser')
const jwt=require('jsonwebtoken')

 app.use(cookieParser())
 
 app.get('/validtoken', auth,(req,res)=>{
  
  //here auth is come fromm middle ware auth file to check user is authentic or not
   console.log(`The valid token is ${req.cookies.jwt}`)
  res.render('validtoken')
})


//logout
app.get('/logout',auth,async(req,res)=>{

  try{

    res.clearCookie('jwt')
    console.log("Log out")

    //logout from just from  one device means current device
    /*req.userinfo.tokens=req.userinfo.tokens.filter((currentelement)=>{
      return currentelement.token !== req.token

    })*/

    //logout from all devices
    req.userinfo.tokens=[];


    //logout howar por por ai user data save hobe
    await req.userinfo.save()
    res.render('login')

  }

  catch(e){
    res.status(401).send(e)

  }

})

//connection

app.listen(port,()=>[
    console.log(` Connected from ${port}`)
])