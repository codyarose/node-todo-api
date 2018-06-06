const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '5b17d417305941b8429c5e9811';

// if (!ObjectID.isValid(id)) {
// 	console.log('ID not valid');
// }

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
// 	if (!todo) {
// 		return console.log('Id not found');
// 	}
// 	console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));



let userId = '5b1597989fe8c6a05b52a215';

// User.findById
User.findById(userId).then((user) => {
	// If the id doesn't match the user
	if (!user) {
		return console.log('User not found');
	}
	// Clg user data
	console.log(JSON.stringify(user, undefined, 2));
	// If error caught clg error
}).catch((e) => console.log(e));