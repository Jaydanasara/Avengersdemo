const router = require("express").Router();
const scoresController = require("../../controllers/scoresController");

// Matches with "/api/books"
router.route("/")
  .get(scoresController.findTop)
  
  .get(scoresController.findTop)
  .post(scoresController.create);

// Matches with "/api/books/:id"
router
  .route("/scores")
  .get(scoresController.findAll)
  .put(scoresController.update)
  .delete(scoresController.remove);

module.exports = router;
