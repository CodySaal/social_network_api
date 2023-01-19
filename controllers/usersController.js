const { User, Thought } = require("../models")

module.exports = {
    // Find all users
    findUsers: async function (req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    // Find specific user
    findUser: async function (req, res) {
        try {
            const user = await User.findById(req.params.id)
            res.json(user)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    // Create new user
    addUser: async function (req, res) {
        try {
            const newUser = await User.create(req.body)
            res.json(newUser)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    // Update existing user
    updateUser: async function (req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true} )
            res.json(updatedUser)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    // Delete existing user and all associated thoughts
    deleteUser: async function (req, res) {
        try {
            const user = await User.findById(req.params.id)
            await Thought.deleteMany({_id: { $in: user.thoughts}})
            const deletedUser = await User.findByIdAndDelete(req.params.id)
            res.json(deletedUser)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    // Add a friend to a user
    addFriend: async function (req, res) {
        try {
            const addedFriend = await User.findByIdAndUpdate({
                _id: req.params.userId
            },
            {
                $push: { friends: req.params.friendId}
            },
            { new: true })
            res.json(addedFriend)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // Delete an existing friend
    deleteFriend: async function (req, res) {
        try {
            const deletedFriend = await User.findByIdAndUpdate({
                _id: req.params.userId
            },
            {
                $pull: { friends: req.params.friendId}
            },
            { new: true })
            res.json(deletedFriend)
        } catch (err) {
            res.status(500).json(err)
        }
    },
}