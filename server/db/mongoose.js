const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
// mongodb://cody:codyvieo9@ds251240.mlab.com:51240/node-todo-db

module.exports = { mongoose };