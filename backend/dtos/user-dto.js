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