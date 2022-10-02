const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  phone: { type:String, required: true },
  activated: { type: Boolean, required: false, default: false },//front end semi protected sections
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema,'users');