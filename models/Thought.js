const mongoose = require("mongoose");
const reactionSchema = require("./Reactions")
const formatDate = require("../utils/format")

const ThoughtSchema = new mongoose.Schema({
   thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
   },
   createdAt: {
    type: Date,
    default: Date.now,
    get: date => formatDate(date),
   },
   username: {
    type: String,
    required: true,
   },
   reactions: [reactionSchema],
}, {
    toJSON: {
        getters: true,
        virutals: true
    }
});

ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length
})

const Thought = mongoose.model("Thought", ThoughtSchema)

module.exports = Thought