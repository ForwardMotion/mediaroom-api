if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');


class Users {
    constructor(db) {
        this.db = db;
        this._users = db.use('_users');
        this._session = db.use('_session');
    }

    async auth(username, password) {
        return  await this.db.auth(username, password);
    }

    async get(user_id) {
        return await this._users.get(user_id);
    }

    async create(username, password) {
        var _id = 'org.couchdb.user:' + username;

        return await this._users.insert({
            'name': username,
            'password': password,
            'roles': [],
            'type': 'user',
        }, _id);
    }
}

module.exports = function(db) {
    return new Users(db);
};
