const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : String,
    about : String,
    interests : [String],
    social_media : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Social_Media'
    }]
})

const socialMediaSchema = new mongoose.Schema({
    name : String,
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    link : String
})

const User = mongoose.model("User", userSchema);
const Social_Media = mongoose.model("Social_Media", socialMediaSchema);

module.exports = {
    User,
    Social_Media
}