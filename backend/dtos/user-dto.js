class userDto{
    id;
    phone;
    activated;
    createdAt;

    //user is the object parameter from the db, we are choosing the propeties which we need
    constructor(user){
        this.id = user._id;
        this.phone = user.phone;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
    }
}

module.exports = userDto;

// what is the purpose of this file? 
// data transfer object - used to transform the data received from the mongo database i.e object (in this case)