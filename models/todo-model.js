const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const todoSchema = new Schema({
    todoName: String,
    todoDescription: String,
    ownerId: String
});

const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;