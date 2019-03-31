const express = require('express');
const app = express();
const PORT = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const clientRoute = require('./routes/client');
const providerRoute = require('./routes/provider');
const config = require('./config/config')

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.json());

app.use('/clients', clientRoute);
app.use('/providers', providerRoute);

app.listen(PORT, () => {
    console.log('Server is running on Port:',PORT);
});
