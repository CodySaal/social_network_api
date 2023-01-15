const mongoose = require("mongoose");

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
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Invalid email."],
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
    toJSON: {
        virtuals: true,
    }
});

UserSchema.virtual("friendCount").get(function() {
    return this.friends.length
})

const User = mongoose.model("User", UserSchema);

module.exports = User;