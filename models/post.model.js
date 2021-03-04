const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const postSchema = new Schema({

    userID:{ type: Schema.Types.ObjectId, ref: 'user'},
    message: String,

});

const Post = model('post', postSchema);

module.exports = Post;