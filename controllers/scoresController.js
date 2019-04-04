const db = require("../models");

// Defining methods for the booksController
module.exports = {
   
  findTop: function(req, res) {
    db.Score
     .find(req.query)
     .sort({ score: -1 }).limit(1)
     .then(dbModel => res.json(dbModel))
     .catch(err => res.status(422).json(err));
 },
  
  findAll: function(req, res) {
     db.Score
      .find(req.query)
      .sort({ score: -1 }).limit(10)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Score
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Score
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Score
      .findOneAndUpdate({ username: req.body.username}, {score: req.body.score})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Score
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
