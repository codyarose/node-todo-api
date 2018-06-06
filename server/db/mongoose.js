const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
// 'mongodb://cody:codyvieo9@ds251240.mlab.com:51240/node-todo-db' ||

module.exports = { mongoose };