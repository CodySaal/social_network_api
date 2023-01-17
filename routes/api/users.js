const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router.get("/", usersController.findUsers);

router.get("/:id", usersController.findUser);

router.post("/", usersController.addUser);

router.put("/update/:id", usersController.updateUser);

router.delete("/delete/:id", usersController.deleteUser);

router.post("/:userId/friends/:friendId", usersController.addFriend);

router.delete("/:userId/friends/:friendId", usersController.deleteFriend);

module.exports = router