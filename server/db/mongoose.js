const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://cody:codyvieo9@ds251240.mlab.com:51240/node-todo-db' || 'mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };