const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");

const db = require("./src/db/database");


const main = express();

const api = require("./src");


main.use(bodyParser.urlencoded({ extended: false }));
main.use(bodyParser.json());


api.use(cors({ origin: true }));
main.use(cors({ origin: true }));


main.use('/api', api);


// set port, listen for requests
const PORT = 8080;
main.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


