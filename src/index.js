const express = require('express');
const useragent = require('express-useragent');
const fs =  require('fs');
const { composeLog } = require('./util');

require('dotenv').config();

const app = express();
app.use(useragent.express());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {

    fs.appendFile(process.env.LOGS_PATH, composeLog(req), (err) => {
        if (err) throw err;
        console.log('Saved!');
    });

    res.send('Hello World!');
});

app.listen(port, () => console.log(`App listening on port ${port}!`));