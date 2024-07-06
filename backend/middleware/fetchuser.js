const jwt = require("jsonwebtoken")
const JWT_SECRET = "HelloWorld@IamShivam"

const fetchuser = (req,res,next)=>{
    // get user data from jwt token and add id to req object
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).json({error:"please login usign valid credentials"})
    }
    try{
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user;
        next();
    }
    catch(error){
        return res.status(401).json({error:"please login usign valid credentials"})

    }
   
}
module.exports = fetchuser