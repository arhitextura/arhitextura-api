const router = require("express").Router();
require("dotenv").config();

const { App, LogLevel } = require("@slack/bolt");
const slack = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNIN_SECRET,
  // LogLevel can be imported and used to make debugging simpler
  // logLevel: LogLevel.DEBUG
});

async function listMessages(channelID) {
  try {
    const result = await slack.client.conversations.history({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channelID,
    });
    return result.messages;
  } catch (error) {
    console.error(error);
  }
}

//localhost:PORT/api/content/news
router.get("/slack", async (req, res) => {
    try {
        const messages = await listMessages(process.env.NOUTATI_PV_CHANNEL_ID);
        res.send(messages);
  } catch (error) {
      res.status(500).send(error)
  }

});

module.exports = router;
