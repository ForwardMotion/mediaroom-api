if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const uuidv4 = require('uuid/v4');

const nano = require('nano')(`http://${process.env.APP_DB_HOST}:${process.env.APP_DB_PORT}`);
const users = new require('./users.model.js')(nano.db);

async function setup() {
    console.log(await users.create('admin', 'mediaroom_Password1.', 'Root'));
}
setup();
