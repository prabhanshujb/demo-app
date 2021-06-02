const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    Name: {
        type: String,
        required: true,
        min: 3,
        max: 255,
      },
    username: {
        type: String, 
        required: true,
        unique: true, 
        min: 6,
        max: 255,
    },
    email: { 
        type: String, 
        required: true,
        unique: true, 
        min: 6,
        max: 255,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true,
        min: 6,
        //6 to 20 characters which contain at least one numeric digit,
        // one uppercase and one lowercase letter
        passw : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
        max: 1024,
    },
    createdOn: {
        type: Date,
        default: Date.now,
      },
});

module.exports = mongoose.model('user', userSchema);