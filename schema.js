const mongo = require('mongoose');

module.exports = mongo.model(
    'Money',
    new mongo.Schema({
        id: String, 
        coins: Number
    })
)
