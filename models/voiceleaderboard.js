const { Schema, model } = require("mongoose");

module.exports = model(
    "voiceleaderboard",
    new Schema({
        Guild: String,
        channelID: Array,
        trackbots: false
    })
)