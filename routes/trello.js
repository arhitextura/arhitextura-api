const router = require('express').Router();
const axios = require('axios');

require('dotenv').config();


const getCards = async () => {
    try {
      return await axios.get(`https://api.trello.com/1/boards/${process.env.BOARD_ID}/cards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`)
    } catch (error) {
      console.error(error)
    }
  }

router.get('/trello', async (req, res) => {

    try {
      const cards = await  getCards()
      res.send(cards.data);
    } catch (error) {
      res.status(500).send("Something went wrong: ", error)
    }

    
    //Gets a list of all cards from the board

    
});

module.exports = router;