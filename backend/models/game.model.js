const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    title: { type: String, required: true },
    html: { type: String, required: false},
    css: { type: String, required: false },
    js: { type: String, required: false },
    password: { type: String, required: false }
}, {
    timestamps: true,
});

const Game = mongoose.model('Game',gameSchema);
module.exports = Game;