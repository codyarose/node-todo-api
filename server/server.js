require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
let {authenticate} = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// POST /todos
app.post('/todos', authenticate, async (req, res) => {
	try {
		let todo = new Todo({
			text: req.body.text,
			_creator: req.user._id
		});

		const doc = await todo.save();
		res.send(doc);
	} catch (error) {
		res.status(400).send(error);
	}
});

// GET /todos
app.get('/todos', authenticate, async (req, res) => {
	try {
		const todos = await Todo.find({
			_creator: req.user._id
		});
		res.send({todos});
	} catch (error) {
		res.status(400).send(e);
	}
});

// GET /todos/:id
app.get('/todos/:id', authenticate, async (req, res) => {
	try {
		let id = req.params.id;

		if (!ObjectID.isValid(id)) {
			return res.status(404).send();
		}

		const todo = await Todo.findOne({
			_id: id,
			_creator: req.user._id
		});
		if (!todo) {
			return res.status(404).send();
		}
		res.status(200).send({todo});
	} catch (error) {
		res.status(400).send();
	}
});

// DELETE /todos/:id
app.delete('/todos/:id', authenticate, async (req, res) => {
	try {
		const id = req.params.id;

		if (!ObjectID.isValid(id)) {
			return res.status(404).send();
		}

		const todo = await Todo.findOneAndRemove({
			_id: id,
			_creator: req.user._id
		});
		if (!todo) {
			return res.status(404).send();
		}

		res.send({todo});
	} catch (error) {
		res.status(400).send();
	}
});

// PATCH /todos/:id
app.patch('/todos/:id', authenticate, async (req, res) => {
	try {
		let id = req.params.id;
		let body = _.pick(req.body, ['text', 'completed']);

		if (!ObjectID.isValid(id)) {
			return res.status(404).send();
		}

		if (_.isBoolean(body.completed) && body.completed) {
			body.completedAt = new Date().getTime();
		} else {
			body.completed = false;
			body.completedAt = null;
		}

		const todo = await Todo.findOneAndUpdate({
			_id: id,
			_creator: req.user._id
		}, {$set: body}, {new: true});

		if (!todo) {
			return res.status(404).send();
		}

		res.send({todo});
	} catch (error) {
		res.status(400).send();
	}
});

// POST /users
app.post('/users', async (req, res) => {
	try {
		let body = _.pick(req.body, ['email', 'password']);
		let user = new User(body);
		await user.save();
		const token = await user.generateAuthToken();
		res.header('x-auth', token).send(user);
	} catch (error) {
		res.status(400).send(error)
	}
});

// GET /users/me
app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', async (req, res) => {
	try {
		const body = _.pick(req.body, ['email', 'password']);
		const user = await User.findByCredentials(body.email, body.password);
		const token = await user.generateAuthToken();
		res.header('x-auth', token).send(user);
	} catch (error) {
		res.status(400).send();
	}
});

// DELETE /users/me/token
app.delete('/users/me/token', authenticate, async (req, res) => {
	try {
		await req.user.removeToken(req.token);
		res.status(200).send();
	} catch (error) {
		res.status(400).send();
	}
});

app.listen(port, () => {
	console.log(`Started up at port ${port}`);
});

module.exports = { app };