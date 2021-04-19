const mongoose=require("mongoose")

//mongodb connction and db create nodedata
mongoose.connect("mongodb://localhost:27017/registrationform",{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
.then(()=>

    console.log("Database Connection Successful")
).catch((err)=>console.log(err)

//then r catch part ai hoilo promise
)