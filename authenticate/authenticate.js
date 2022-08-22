const jwt = require('jsonwebtoken');
const User = require('../models/user')

 exports.authenticateToken = (req, res, next)=> {
    try{
        const token=req.header('authorization')

        const userId=jwt.verify(token, process.env.TOKEN_SECRET);
        
        User.findByPk(userId).then(user=>{
            
            req.user=user;
            next();
        })
        .catch(err=>{
            throw new Error(err)
        })
    }

    catch(err){
        console.log(err)
         res.status(404).JSON({sucess:false})
    }
}