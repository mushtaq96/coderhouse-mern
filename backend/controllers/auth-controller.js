const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');


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
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);

        //send otp
        try{
            //await otpService.sendBySms(phone, otp);
            res.json({
                hash:`${hash}.${expires}`,
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
        const { accessToken, refreshToken } = tokenService.generateTokens({_id: user._id, activated: false});

        //custom cookie setting
        res.cookie('refreshtoken', refreshToken, {
            maxAge: 1000*60*60*24*30,//valid for 30 days
            httpOnly: true //if this value is set the cookie is secure, js cannot read it on client.
        });

        res.json({accessToken, user});
    }
}

module.exports = new AuthController();//export an object of the class
//this kind of paradigm is SINGLETON pattern-same object is retrived everytime
