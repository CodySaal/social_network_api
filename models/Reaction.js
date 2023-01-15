const mongoose = require("mongoose");

const ReactionSchema = new mongoose.Schema({
   
});

const Reaction = mongoose.model("Reaction", ReactionSchema)

module.exports = Reaction