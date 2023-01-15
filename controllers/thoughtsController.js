const { Thought, User } = require("../models")

module.exports = {
    findThoughts: async function (req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    findThought: async function (req,res) {
        try {
            const thought = await Thought.findById(req.params.id)
            res.json(thought)
        } catch(err) {
            res.status(500).json(err)
        }
    },
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
    updateThought: async function (req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.json(updatedThought)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    deleteThought: async function (req, res) {
        try {
            const deletedThought = await Thought.findByIdAndDelete(req.params.id,)
            res.json(deletedThought)
        } catch(err) {
            res.status(500).json(err)
        }
    },
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