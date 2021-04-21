require('dotenv').config()
const express=require('express')

// 1.construct router
const router=new express.Router()
//ekhn app.js a use hobe 
//costract router end
const User =require('../Model/data')


//routing

//signup
router.post('/registration',async(req,res)=>{

    const pass=req.body.password;
    const cpass=req.body.retypepass;

    if(pass===cpass){

        const userform=new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            retypepass:req.body.retypepass
        })

        //Middleware

        //amader password hash korte hobe
        //jdi na kori tahole password db a text akar a jabe
        //so save howar agei amader password hash korte hobe
        //aitakei bole middleware
        //data.js jeikhn a password schema ase oikhn a middleware er kaj korbo


        //middle ware a amar userAuth er kaj o korte pari
        //Jwt er maddhome
        //again data.js a giye function create kore korte hobe

        const token=await userform.generateAuthToken();
        console.log(`The token part is ${token}`)
           
        //ekhn token generate korar por amader kaj hoilo token
        //token k cookies a store kora 

        res.cookie('jwt',token,  {
            express:new Date(Date.now()+300000),
            httpOnly:true
        })
        //here jwt cookie name 
        //aikhn 3000 mean kore ami ekta website a dhuklam 
        //thn login howar por autmoaticly 10/20mins porbe abar login koren
        //like nsu rds 
        //so token cokkies theke expire kore dei
       
       //cookie end

        const storeuser=await userform.save()
        res.status(200).render("index")

    }

    else{
        res.send("Password not match")
    }
   
})



//login

router.post('/login',async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password

        const usermail=await User.findOne({email:email})
         //ekhn amra reg a jei password disi ta to hash hoye db a ase
         //so amra jokhon login korte jabo tokhon to password text akar a jabe
         //so bcrypt kore nite jate db er password and login er pass word match hoy
         //match na hole login hobe na
        const ismatch=await bcrypt.compare(password,usermail.password)

        //middle ware

        const token=await usermail.generateAuthToken();
        console.log(`The login token part is ${token}`)
        res.cookie('jwt',token,  {
            express:new Date(Date.now()+3000),
            httpOnly:true
        })
        //here jwt cookie name 
        //aikhn 3000 mean kore ami ekta website a dhuklam 
        //thn login howar por autmoaticly 10/20mins porbe abar login koren
        //like nsu rds 
        //so token cokkies theke expire kore dei
       
       //cookie end
       //cookie token get 
       //cookie get kora lagbe cz jwt token cookie te ase
       //tar jonno npm i cookie-parser
       //var cookieParser = require('cookie-parser')

       //cookie parser app.js a use korte hobe. and 
       //extra ekta page khule ta get korte hobe
     //var cookieParser = require('cookie-parser')
      // app.use(cookieParser())





        //middleware end
        if(ismatch){
            res.status(201).render("index")
            
        }

        else{
            res.send("Please Register")
        }

    }

    catch(e){
        res.status(400).send("Invalid mail")
    }
})

//password k secure korar jonno amra hashing use kori
//ekhn hashing just korlei hobe na
//hashing hisabe bycrypt js rounds 12 use korte hobe
//hacker er 3 years laggbe password hack korte jdi bycriptjs rounds 12 use kori
// npm i bcryptjs

//hashing start

const bcrypt=require('bcryptjs')

const passhashing=async(password)=>{
    const hashPassword=await bcrypt.hash(password,10)
    // pounds 10 use korsi jate fast hoy hashing
    console.log(hashPassword)


    //ekhn amra jokhn login korbo db a j passwoord ase tar sathe millei
    //tobe na login hobe
    //so amra kivabe seita bujbo j amader real time input password
    //and db er password same hobe

    const passwordmatch=await bcrypt.compare(password,hashPassword)
    console.log(passwordmatch)

    

}

passhashing("shamim")

//Jason web token auth(JWT)
const jwt=require('jsonwebtoken')
//at first create token
const jwtauth=async()=>{
    const token=await jwt.sign({_id:"607c6c61631eed2f283daaa6"},process.env.SECRET-KEY)

    console.log(` THe Token is for id  ${token}`)
    //id part is payload
    //welcome to ai part hoilo secret key

    //for user varify

    const userverify=await jwt.verify(token,process.env.SECRET-KEY)
     console.log(`After verify is ${userverify}`)
  
     //it indicate user is genuine or not

}

jwtauth()


module.exports=router