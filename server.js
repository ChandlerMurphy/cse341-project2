const express = require('express');
const mongodb = require('./data/database.js');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3002;
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught Exception: ${err}\n` + `Exception Origin: ${origin}`);
});

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Database is listening and Node running on port ${port}`)});
    }
});

// cse341-project2-089k.onrender.com