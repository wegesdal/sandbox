const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));

const corsOptions = {
    origin: 'https://safe-tor-60738.herokuapp.com/',
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions));
app.options('*', cors());
app.use('/', routes);

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const gamesRouter = require('./routes/games');

app.use('/games', gamesRouter)

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});