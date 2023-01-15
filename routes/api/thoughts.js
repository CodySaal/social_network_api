const router = require("express").Router();
const thoughtsController = require("../../controllers/thoughtsController");

router.get("/", thoughtsController.findThoughts);

router.get("/:id", thoughtsController.findThought);

router.post("/", thoughtsController.newThought);

router.put("/update/:id", thoughtsController.updateThought);

router.delete("/delete/:id", thoughtsController.deleteThought);

router.post("/:thoughtId/reactions", thoughtsController.newReaction);

router.delete("/:thoughtId/reactions/:reactionId", thoughtsController.deleteReaction);

module.exports = router