const express = require('express');
require('dotenv').config();
// Require the Bolt for JavaScript package (github.com/slackapi/bolt)
const api = express();



//Import routes
const newsRoute = require('./routes/news');
const trelloRoute = require('./routes/trello')
//Routes Middlewares
api.use('/api/content', newsRoute);
api.use('/api/content', trelloRoute)




api.listen(8443,()=> console.log('API is running'));