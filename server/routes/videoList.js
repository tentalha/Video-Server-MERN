const express = require('express');
const router = express.Router();

const VideoDetails = require('../models/VideoDetailsSchema');

router.get('/', (req, res, next) => {
  VideoDetails
    .find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});


router.delete('/:id', (req, res) => {
  const id = req.params.id;
  VideoDetails.deleteOne({ _id: id }).then(data => res.status(200).json({
    message: "Deleted Successfully!"
  })).catch(err => res.status(500).send({
    message: "Some error ocurred",
    payload: {
      err
    }
  }))
})

module.exports = router;
