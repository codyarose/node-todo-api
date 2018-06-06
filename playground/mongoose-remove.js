const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '5b1842c6bd96d0f70428016c'}).then((todo) => {

});

Todo.findByIdAndRemove('5b1842c6bd96d0f70428016c').then((todo) => {
	console.log(todo);
});