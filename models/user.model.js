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
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    passwordHash: {
        type: String,
        require: [true, 'the password is require.'],

    },
    birthday: {
        type: Date,
        require: [true, 'Please choise a birthday']
    },

    country: {
        type: String,
        require: [true, 'Please choise a country']
    },
    genre: {
        type: String,
        enum: ['female', 'male', 'others'],
        require: [true, 'Please choise a genre']
    },


});



const User = model('user', userSchema);

module.exports = User;