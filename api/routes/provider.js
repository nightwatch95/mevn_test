const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

let Provider = require('../models/provider')

app.post('/add_provider', (req, res) => {
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

app.get('/providers', (req, res) => {
    Provider.find((err, providers) => {
        if(err){
            res.json(err);
        }
        else {
            res.json(providers);
        }
    });
});

app.get('/provider/:id', (req, res) => {
    let id = req.params.id;
    Provider.findById(id, (err, provider) => {
        if (err) {
            res.json(err);
        }
        res.json(provider);
    });
});

app.put('/providers/:id', (req, res) => {
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

app.delete('/providers/:id', (req, res) => {
    Provider.findByIdAndRemove({_id: req.params.id}, err => {
        if (err)
            res.json(err);
        else
            res.json('Successfully removed');
    });
});

app.listen(process.env.PORT || 8081)
