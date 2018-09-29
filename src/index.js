const express = require('express');
const useragent = require('express-useragent');
const fs =  require('fs');
const { composeLog } = require('./util');

require('dotenv').config();

const app = express();
app.use(useragent.express());
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    // check if logs dir is present
    const LOGS_PATH = process.env.LOGS_PATH;
    if(!fs.existsSync(LOGS_PATH)) {
        // if not - create a folder
        fs.mkdir(LOGS_PATH);
    }
    fs.appendFile(`${LOGS_PATH}/access.log`, composeLog(req, process.env.TEMPLATE), (err) => {
        if (err) throw err;
        console.log('Saved!');
    });

    res.send('Hello World!');
});

app.listen(port, () => console.log(`App listening on port ${port}!`));