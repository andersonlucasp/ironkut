const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        require: [true, 'The user name is require'],
    },
    lastname: {
        type: String,
        trim: true,
        require: [true, 'The lastname is require'],
    },
    email: {
        type: String,
        require: [true, 'The e-mail is require'],
        unique: true,
        lowcase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    passWordHash: {
        type: String,
        require: [true, 'the password is require.'],
    }

});

//colocar data de nasc. e país <<<<<<<<

const User = model('user', userSchema);

module.exports = User;