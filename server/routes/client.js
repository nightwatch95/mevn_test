const express = require('express');
const router = express.Router();

let Client = require('../models/client');

router.post('/add', (req, res) => {
	let clientModel = new Client(req.body.client);
	clientModel.save((err, client) => {
		if (err) {
			console.log(err);
			return res.status(500).send(err);
		}
		Client.populate(client, 'providers', (err, client) => {
			res.send(client);
		})
	});
});

router.get('/', (req, res) => {
	Client.find()
	.sort('name')
	.populate('providers')
	.exec((err, clients) => {
		if (err) return res.status(404).send(err);
        res.send(clients);
	});
});

router.get('/:id', (req, res) => {
	Client.findById(req.params.id)
		.populate('providers')
		.exec((err, client) => {
			if (err) return res.status(404).send(err);
			res.send(client);
		})
});

router.put('/:id', (req, res) => {
	let newClient = new Client(req.body.client);
	console.log(newClient);
	Client.findByIdAndUpdate(req.params.id, newClient, {new: true}, (err, client) => {
		if (err) return res.status(404).send(err);
        Client.populate(client, 'providers', (err, client) => {
            res.send(client);
        });
	});
});

router.delete('/:id', (req, res) => {
	Client.findByIdAndRemove({
		_id: req.params.id
	}, err => {
		if (err)
			res.json(err);
		else
			res.json('Successfully removed');
	});
});

module.exports = router;
