const Jimp = require('jimp')
const path = require('path');
const userService = require('../services/user-service');
const UserDto = require('../dtos/user-dto');

class ActivateController{
    async activate(req,res){
        //activation logic
        const {name, avatar} = req.body;
        if(!name || !avatar){
            res.status(400).json({message:'All fields are requiredd!'});
        }
        //there is an error when there is no stream of data for existing profile pic

        //image base64 convert to an image to store in server file system
        const buffer = Buffer.from(avatar.replace(/^data:image\/jpeg;base64,/, ''), 'base64');
        const imagePath = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}.png`;
        
        //compression package
        try{
            const jimResp = await Jimp.read(buffer);
            jimResp.resize(150, Jimp.AUTO).write(path.resolve(__dirname, `../storage/${imagePath}`));//height is auto, to make aspect ratio remain the same
        }catch(error){
            console.log(error)
            res.status(500).json({message:'Could not process the image'});
        }

        const userId = req.user._id;
        //Update the user
        try{
            const user = await userService.findUser({_id: userId});//req.user is coming from middleware
            if(!user){
                res.status(404).json({message:'User not found!'});
            }
            user.activated = true;
            user.name = name;
            user.avatar = `/storage/${imagePath}`;
            user.save();
            res.json({user: new UserDto(user), auth: true});
        }catch(error){
            res.status(500).json({message:'Sething went wrong!!'});//??
        }
    }
}

module.exports = new ActivateController();