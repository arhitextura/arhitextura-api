const router = require("express").Router();
const axios = require("axios");
const { ERRORS_TYPE } = require("../constants/ERROR");
const trello = require("./trello_GET_functions.js");

require("dotenv").config();

/**
 * Get all cards on the board
 * @example https://api.arhitextura.ro/trello/cards/
 */
router.get("/cards", async (req, res) => {
  const resp = trello.getAllCardsOnBoard();
  resp
    .then((data) => {
      res.send(data);
      return data;
    })
    .catch((error) => {
      res
        .status(error.message)
        .send(
          "Error " + error.message + " " + ERRORS_TYPE[error.message].message
        );
    });
});

/**
 * Get all lists on the board
 * @example https://api.arhitextura.ro/trello/cards/
 */
router.get("/lists", async (req, res) => {
  const resp = trello.getAllListsOnBoard();
  resp
    .then((data) => {
      res.send(data);
      return data;
    })
    .catch((error) => {
      res
        .status(error.message)
        .send(
          "Error " + error.message + " " + ERRORS_TYPE[error.message].message
        );
    });
});

/**
 * Get all cards that are on a list specified by ID
 * @example https://api.arhitextura.ro/trello/list/<#someId>/cards
 */
router.get(`/list/:id/cards`, async (req, res) => {
  const resp = trello.getCardsOnList(req.params.id);
  resp
    .then((data) => {
      res.send(data);
      return data;
    })
    .catch((error) => {
      res
        .status(error.message)
        .send(
          "Error " + error.message + " " + ERRORS_TYPE[error.message].message
        );
    });
});

/**
 * Get all cards that are on a list specified by ID
 * @example https://api.arhitextura.ro/trello/list/<#someId>/cards
 */
router.get(`/checklist/:id`, async (req, res) => {
  const resp = trello.getCheckListByID(req.params.id);
  resp
    .then((data) => {
      res.send(data);
      return data;
    })
    .catch((error) => {
      res
        .status(error.message)
        .send(
          "Error " + error.message + " " + ERRORS_TYPE[error.message].message
        );
    });
});

module.exports = router;
