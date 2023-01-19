const { Thought, User } = require("../models")

module.exports = {
    // Get all thoughts
    findThoughts: async function (req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts)
        } catch(err) {
            res.status(500).json(err)
            console.log(err)
        }
    },
    // Get specific thought
    findThought: async function (req,res) {
        try {
            const thought = await Thought.findById(req.params.id)
            res.json(thought)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    // Create new thought
    newThought: async function (req, res) {
        try {
            const newThought = await Thought.create(req.body)
            await User.findOneAndUpdate(
                {username: req.body.username},
                {$push: { thoughts: newThought._id}}
            )
            res.json(newThought)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    // Updated existing thought
    updateThought: async function (req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.json(updatedThought)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    // Delete existing thought
    deleteThought: async function (req, res) {
        try {
            const deletedThought = await Thought.findByIdAndDelete(req.params.id,)
            res.json(deletedThought)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    // Create a reaction to a thought
    newReaction: async function (req, res) {
        try {
            const newReaction = await Thought.findByIdAndUpdate({
                _id: req.params.thoughtId
            },
                {
                    $push: { reactions: req.body }
                },
                { new: true })
            res.json(newReaction)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // Delete existing reaction
    deleteReaction: async function (req, res) {
        try {
            const deletedReaction = await Thought.findByIdAndUpdate({
                _id: req.params.thoughtId
            },
                {
                    $pull: {
                        reactions: {
                            reactionId: req.params.reactionId
                        }
                    }
                },
                { new: true })
            res.json(deletedReaction)
        } catch (err) {
            res.status(500).json(err)
        }
    },
}