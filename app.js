const express=require("express")
const app=express()
const path=require('path')
const port=process.env.PORT || 3000
const hbs=require("hbs")

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



//connection

app.listen(port,()=>[
    console.log(` Connected from ${port}`)
])