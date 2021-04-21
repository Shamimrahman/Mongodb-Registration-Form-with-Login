const jwt=require('jsonwebtoken')
//get co0llection
const User=require('../Model/data')

const auth=async(req,res,next)=>{
    try{
        //get token from cookies

        const token=req.cookies.jwt;
        //verify user 
        const verifyUser=jwt.verify(token,process.env.SECRET_KEY)
        console.log(`The verify user is ${verifyUser}`)

        const userinfo=await User.findOne({_id:verifyUser._id})
        console.log(userinfo.username)

        //for logout
          req.token=token;
          req.userinfo=userinfo;
        next()


    }

    catch(e){
        res.status(401).send(e)

    }
}

module.exports=auth