const mongoose = require('mongoose');
const MazeSchema = new mongoose.Schema({
    name: String,
    owner:String,//change
    maze:[Number],
    attempts:Number,
    successes: Number
})
module.exports = mongoose.model('Maze',MazeSchema)