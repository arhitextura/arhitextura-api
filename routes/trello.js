const router = require("express").Router();
const axios = require("axios");
const {ERRORS_TYPE} = require('../constants/ERROR');
const trello = require("./trello_GET_functions.js");

require("dotenv").config();

//Get all lists in the board


router.get("/cards", async (req, res, next) => {
  const resp = trello.getAllCardsOnBoard()
  resp.then(data=> {
    res.send(data)
    return data
  }).catch(error=>{
    res.status(error.message).send("Error " + error.message + " " + ERRORS_TYPE[error.message].message)
  })
});

router.get("/lists", async (req, res, next) => {
  const resp = trello.getAllListsOnBoard()
  resp.then(data=> {
    res.send(data)
    return data
  }).catch(error=>{
    res.status(error.message).send("Error " + error.message + " " + ERRORS_TYPE[error.message].message)
  })
});

router.get(`/cards/:id`, async (req, res, next) => {
  const resp = trello.getCardsOnList(req.params.id)
  resp.then(data=> {
    res.send(data)
    return data
  }).catch(error=>{
    res.status(error.message).send("Error " + error.message + " " + ERRORS_TYPE[error.message].message)
  })
});



module.exports = router;
