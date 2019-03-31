const express = require('express');
const router = express.Router();

let Provider = require('../models/provider')

router.post('/add', (req, res) => {
    let provider = new Provider(req.body.provider);
    provider.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	});
});

router.get('/', (req, res) => {
    Provider.find((err, providers) => {
        if(err){
            res.json(err);
        }
        else {
            res.json(providers);
        }
    });
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    Provider.findByIdAndRemove({_id: req.params.id}, err => {
        if (err)
            res.json(err);
        else
            res.json('Successfully removed');
    });
});

module.exports = router;
