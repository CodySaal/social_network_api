const mongoose = require("mongoose");

const ThoughtSchema = new mongoose.Schema({
   
});

const Thought = mongoose.model("Thought", ThoughtSchema)

module.exports = Thought