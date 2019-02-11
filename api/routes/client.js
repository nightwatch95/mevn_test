const express = require('express');
const clientRoutes = express.Router();

let Client = require('../models/client');

clientRoutes.route('/add').post((req, res) => {
    let client = new Client(req.body.client);
    client.save()
        .then(() => {
            res.status(200).json({'business': 'business is added successfully'});
        })
        .catch(() => {
            res.status(400).send("unable to save to database");
        });
});

clientRoutes.route('/').get((req, res) => {
    Client.find((err, clients) => {
        if(err){
            res.json(err);
        }
        else {
            res.json(clients);
        }
    });
});

clientRoutes.route('/edit/:id').get((req, res) => {
    let id = req.params.id;
    Client.findById(id, (err, client) => {
        if (err) {
            res.json(err);
        }
        res.json(client);
    })
});

clientRoutes.route('/update/:id').post((req, res) => {
    Client.findById(req.params.id, (err, client) => {
        if (!client) {
            res.status(404).send('Client is not found');
        }
        else {
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

clientRoutes.route('/delete/:id').delete((req, res) => {
    Client.findByIdAndRemove({_id: req.params.id}, err => {
        if (err)
            res.json(err);
        else
            res.json('Successfully removed');
    });
});

module.exports = clientRoutes;