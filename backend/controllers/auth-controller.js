const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');

class AuthController{
    async sendOtp(req, res){
        //logic
        const {phone} = req.body;
        if(!phone){
            res.status(400).json({message:'Phone field is required'});
        }
        const otp = await otpService.generateOtp();

        //hash the otp logic
        const ttl = 1000 * 60 * 2;//2 min to login, expire time
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;//
        const hash = hashService.hashOtp(data);

        //send otp
        try{
            //await otpService.sendBySms(phone, otp);
            res.json({
                hash:`${hash}.${expires}`,//expires is done twice bcz - the second time expires is a timestamp
                phone,
                otp,
            });
        }catch(err){
            console.log(err);
            res.status(500).json({message:'message sending failed'});
        }
    }

    async verifyOtp(req, res){
        const { otp, hash, phone } = req.body;
        //validate the input
        if(!otp || !hash || !phone){
            res.status(400).json({message:'all fields are required'});
        }

        const [hashedOtp, expires] = hash.split('.');
        if(Date.now() > +expires){ //plus explicitly converts string to a number
            res.status(400).json({message: 'OTP is expired'})
        }

        const data = `${phone}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp, data);
        if(!isValid){
            res.status(400).json({message:'invalid otp'});
        }

        let user;        
        
        try {
            user = await userService.findUser({phone: phone});
            if(!user){
                user = await userService.createUser({phone: phone});
            }
        } catch (error) {
            console.log(err);
            res.status(500).json({message:'Db error'});
        }

        //jwt tokens generation
        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id,
            activated: false
        });

        await tokenService.storeRefreshToken(refreshToken, user._id)

        //custom cookie setting
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,//valid for 30 days
            httpOnly: true //if this value is set the cookie is secure, js cannot read it on client prevents xss attacks.
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });

        const userDto = new UserDto(user);
        res.json({user: userDto, auth: true});//auth - true is a flag for the client to understand
    }

    async refresh(req, res){
        //get refresh token from cookie
        const {refreshToken: refreshTokenFromCookie} = req.cookies;//refreshTokenFromCookie is an alias
        //check if token is valid
        let userData;
        try{
            userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
        }catch(error){
            return res.status(401).json({message:'Invalid token'});
        }
       
        //check if token is in db
        try{
            const token = await tokenService.findRefreshToken(
                userData._id, 
                refreshTokenFromCookie
            );
            if(!token){
                return res.status(401).json({message: "Unauthorized, Invalid Token"})
            }
        }catch(error){
            return res.status(500).json({message:'Internal error'});//since it is a db error
        }
       
        //check if valid user
        const user = await userService.findUser({_id: userData._id});
        if(!user){
            return res.status(404).json({message:'No user'});

        }
        //generate new tokens
        const {refreshToken, accessToken} = tokenService.generateTokens({_id: userData._id});

        //update refresh token in db
        try{
            await tokenService.updateRefreshToken(userData._id, refreshToken);
        }catch(error){
            return res.status(500).json({message:'Internal error'});//since it is a db error
        }
        
        //put inside cookie
        //custom cookie setting 
        //these lines can be refactored
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000*60*60*24*30,//valid for 30 days
            httpOnly: true //if this value is set the cookie is secure, js cannot read it on client prevents xss attacks.
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });

        
        //send response
        const userDto = new UserDto(user);
        res.json({user: userDto, auth: true});//auth - true is a flag for the client to understand
    }
}

module.exports = new AuthController();//export an object of the class
//this kind of paradigm is SINGLETON pattern-same object is retrived everytime
