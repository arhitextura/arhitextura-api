const express = require('express');
require('dotenv').config();
// Require the Bolt for JavaScript package (github.com/slackapi/bolt)
const api = express();



//Import routes
const newsRoute = require('./routes/slack');
const trelloRoute = require('./routes/trello')
//Routes Middlewares
api.use('/api/content', newsRoute);
api.use('/api/content', trelloRoute)




api.listen(process.env.PORT,()=> console.log('API is running'));