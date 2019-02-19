const express = require('express');
const providerRoutes = express.Router();

let Provider = require('../models/provider');

providerRoutes.route('/add').post((req, res) => {
    let provider = new Provider(req.body.provider);
    provider.save()
        .then(() => {
            res.status(200).json({'business': 'Provider is added successfully'});
        })
        .catch(() => {
            res.status(400).send("unable to save to database");
        });
});

providerRoutes.route('/').get((req, res) => {
    Provider.find((err, providers) => {
        if(err){
            res.json(err);
        }
        else {
            res.json(providers);
        }
    });
});

providerRoutes.route('/edit/:id').get((req, res) => {
    let id = req.params.id;
    Provider.findById(id, (err, provider) => {
        if (err) {
            res.json(err);
        }
        res.json(provider);
    });
});

providerRoutes.route('/update/:id').post((req, res) => {
    Provider.findById(req.params.id, (err, provider) => {
        if (!provider) {
            res.status(404).send('provider is not found');
        }
        else {
            provider.name = req.body.provider.name;
            provider.save().then(() => {
                res.json('Update complete');
            })
            .catch(() => {
                res.status(400).send('Unable to update the DB');
            });
        }
    });
});

providerRoutes.route('/delete/:id').delete((req, res) => {
    Provider.findByIdAndRemove({_id: req.params.id}, err => {
        if (err)
            res.json(err);
        else
            res.json('Successfully removed');
    });
});

module.exports = providerRoutes;