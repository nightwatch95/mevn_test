const express = require('express');
const clientRoutes = express.Router();

let Client = require('./client.model');

clientRoutes.route('/add').post(function (req, res) {
    let client = new Client(req.body); // req.body.client. изменить в клиенте тоже 
    client.save()
        .then(() => {
            res.status(200).json({'business': 'business in added successfully'});
        })
        .catch(() => {
            res.status(400).send("unable to save to database"); // incorrect status. send doesnt complete response. google it. req res methods
        });
});

clientRoutes.route('/').get(function(req, res) {
    Client.find(function(err, clients) {
        if(err){
            res.json(err);
        }
        else {
            res.json(clients);
        }
    });
});

clientRoutes.route('/edit/:id').get(function(req, res) {
    let id = req.params.id;
    Client.findById(id, function(err, client) {
        if (err) {
            res.json(err);
        }
        res.json(client);
    })
});

clientRoutes.route('/update/:id').post(function(req, res) {
    Client.findById(req.params.id, function(err, client) {
        if (!client) {
            res.status(404).send('Client is not found');
        }
        else {
            client.name = req.body.name;
            client.email = req.body.email;
            client.phone = req.body.phone;
            client.providers = req.body.providers;
            client.save().then(() => {
                res.json('Update complete');
            })
            .catch(() => {
                res.status(400).send('Unable to update the DB');
            });
        }
    });
});

clientRoutes.route('/delete/:id').delete(function(req, res) {
    Client.findByIdAndRemove({_id: req.params.id}, function(err) {
        if (err)
            res.json(err);
        else
            res.json('Successfully removed');
    });
});

module.exports = clientRoutes;