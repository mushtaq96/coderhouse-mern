const tokenService = require("../services/token-service");

module.exports = async function(req, res, next){
    try{
        const {accessToken} = req.cookies;
        if(!accessToken){
            throw new Error();//goes to catch block
        }
        const userData = await tokenService.verifyAccessToken(accessToken);//this line

        if(!userData){
            throw new Error();//goes to catch block
        }

        req.user = userData;
        
        console.log(userData);
        next();// if everything is okay, then run "next" method
    }catch(error){
        res.status(401).json({message:'Invalid token'});
    }

};

