
const axios = require("axios");

/**
 * @param {Promise} _request - Must be a Promise, so it will handle the request. 
 * @returns {JSON} Returns a JSON data or an Error
 * @returns {Error} If something goes wrong it will return an error message.
 */
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
    throw new Error("_request must a Promise type in _errorHandler function()")
  }
}

/**
 * Fetches all lists on trello board, BOARD_ID is set in NODE_ENV
 * @returns {_errorHandler} Return a JSON Data if no errors trough _errorHadler(_request) function
 */
async function getAllListsOnBoard() {
  const request = axios.get(
    `https://api.trello.com/1/boards/${process.env.BOARD_ID}/lists?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
  return _errorHandler(request);
}

/**
 * Fetches all cards on trello board, BOARD_ID is set in NODE_ENV
 * @returns {_errorHandler} Return a JSON Data if no errors trough _errorHadler(_request) function
 */
async function getAllCardsOnBoard() {
  const request = axios.get(
    `https://api.trello.com/1/boards/${process.env.BOARD_ID}/cards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
  return _errorHandler(request);
}

/**
 * Fetches all cards on trello board, BOARD_ID is set in NODE_ENV
 * @param {String} id - Must specify the ID, else it will send an error message trough _errorHandler
 * @returns {_errorHandler} Return a JSON Data if no errors trough _errorHadler(_request) function
 * @example getCardsOnList("5f832e55f393771fb23c1cb9")
 */
async function getCardsOnList(id) {
  const request = axios.get(
    `https://api.trello.com/1/lists/${id}/cards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
  return _errorHandler(request);
}

async function getCheckListByID(id) {
  const request = axios.get(
    `https://api.trello.com/1/checklists/${id}?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
  return _errorHandler(request);
}

module.exports.getCardsOnList = getCardsOnList;
module.exports.getAllCardsOnBoard = getAllCardsOnBoard;
module.exports.getAllListsOnBoard = getAllListsOnBoard;
module.exports.getCheckListByID = getCheckListByID;
