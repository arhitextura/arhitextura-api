const router = require("express").Router();
const axios = require("axios");
const { request } = require("express");

require("dotenv").config();
//Get all cards in the board
const getCards = async () => {
  try {
    return await axios.get(
      `https://api.trello.com/1/boards/${process.env.BOARD_ID}/cards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
    );
  } catch (error) {
    console.error(error);
  }
};
//Get all lists in the board
const getLists = async () => {
  try {
    return await axios.get(
      `https://api.trello.com/1/boards/${process.env.BOARD_ID}/lists?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
    );
  } catch (error) {
    console.error(error);
  }
};

//Get cards on a specific list ID
const getCardsByListId = async (id) => {
  
   axios.get(
      `https://api.trello.com/1/lists/${id}/cards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
    ).then(response=>{
      return response
    }).catch(err=>{
      if (err.response) {
        // client received an error response (5xx, 4xx)
        return new Error("Status:", err.response.status)
      } else if (err.request) {
        // client never received a response, or request never left
        return new Error("Status:", err.request)
      } else {
        // anything else
        return "Something went wrong"
      }
    });
  
  };

router.get("/cards", async (req, res, next) => {
  try {
    const cards = await getCards();
    res.status(200).send(cards.data);
  } catch (error) {
    next(error);
  }
});

router.get("/lists", async (req, res, next) => {
  try {
    const cards = await getLists();
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.status(200).send(cards.data);
  } catch (error) {
    next(error);
  }
});

router.get(`/cards/:id`, async (req, res, next) => {
  axios.get(
    `https://api.trello.com/1/lists/${req.params.id}/cards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  ).then(response=>{
    
    res.send(response.data)
  }).catch(err=>{
    if (err.response) {
      // client received an error response (5xx, 4xx)
      next("Error:" + err.response.status)
    } else {
      next("Something went wrong")      
    }
  });
});

module.exports = router;
