const mongoose = require("mongoose");

var validateEmail = function(email) {
    var regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    return regex.test(email)
};

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validateEmail, "Not a valid email."],
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },
    thoughts: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Thought",
        }
    ],
    friends: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        }
    ],
}, {
    virtuals: {
        friendCount: {
            get() {
                return this.friends.length
            }
        }
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;