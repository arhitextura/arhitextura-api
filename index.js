const express = require('express');
require('dotenv').config();
// Require the Bolt for JavaScript package (github.com/slackapi/bolt)
const api = express();



//Import routes
const slackRoute = require('./routes/slack');
const trelloRoute = require('./routes/trello')
//Routes Middlewares
// api.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "https://arhitextura.ro/"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
  
api.use('/slack', slackRoute);
api.use('/trello', trelloRoute)




api.listen(process.env.PORT,()=> console.log('API is running'));