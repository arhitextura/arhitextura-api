const axios = require("axios");

function _errorHandler(_request) {
  if (_request instanceof Promise) {
    return _request
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          throw new Error(err.response.status);
        } else {
          throw new Error(
            "Something went really bad! Please contact the administrator."
          );
        }
      });
  } else {
    throw new Error ("_request must a Promise type in _errorHandler function()")
  }
}

async function getAllListsOnBoard() {
  const request = axios.get(
    `https://api.trello.com/1/boards/${process.env.BOARD_ID}/lists?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
  return _errorHandler(request);
}

async function getAllCardsOnBoard() {
  const request = axios.get(
    `https://api.trello.com/1/boards/${process.env.BOARD_ID}/cards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
  return _errorHandler(request);
}

async function getCardsOnList(id) {
  const request = axios.get(
    `https://api.trello.com/1/lists/${id}/cards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
  return _errorHandler(request);
}

module.exports.getCardsOnList = getCardsOnList;
module.exports.getAllCardsOnBoard = getAllCardsOnBoard;
module.exports.getAllListsOnBoard = getAllListsOnBoard;
