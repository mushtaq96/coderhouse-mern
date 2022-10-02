const hashService = require('./hash-service');

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid,smsAuthToken,{
    lazyLoading:true
});

class OtpService{
    async generateOtp(){
        const otp = Math.floor(1000 + Math.random()*9000);
        console.log(otp)
        return otp; 
    }
    async sendBySms(phone, otp){
        return await twilio.messages.create({
            to   : phone,
            from : process.env.SMS_FROM_NUMBER,
            body : `your codershouse otp is ${otp}`,
        });
    }
    verifyOtp(hashedOtp, data){
        let computedHash = hashService.hashOtp(data);
        return computedHash === hashedOtp
    }
    
}

module.exports = new OtpService();