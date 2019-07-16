const express = require('express');
const router = express.Router();

let Client = require('../models/client');

router.post('/add', (req, res) => {
	let clientModel = new Client(req.body.client);
	clientModel.save((err, client) => {
		Client.populate(client, 'providers', (err, client) => {
			res.send(client);
		})
	})
	.catch((err) => console.log(err))
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
	Client.findById(req.params.id, (err, client) => {
		if (err) {
			console.log(err);
		}
		res.send(client);
	})
});

router.put('/:id', (req, res) => {
	Client.findById(req.params.id, (err, client) => {
		if (!client) {
			res.status(404).send('Client is not found');
		} else {
			client.name = req.body.client.name;
			client.email = req.body.client.email;
			client.phone = req.body.client.phone;
			client.providers = req.body.client.providers;
			client.save().then(() => {
					res.json('Update complete');
				})
				.catch(() => {
					res.status(400).send('Unable to update the DB');
				});
		}
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
