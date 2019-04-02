const express = require('express');
const router = express.Router();

let Client = require('../models/client');

router.post('/add', (req, res) => {
	let client = new Client(req.body.client);
	client.save()
		.then(() => {
			res.status(200).json({
				'business': 'Client is added successfully'
			});
		})
		.catch(() => {
			res.status(400).send("unable to save to database");
		});
});

router.get('/', (req, res) => {
	Client.find((err, clients) => {
		if (err) {
			res.json(err);
		} else {

			res.json(clients);
		}
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
