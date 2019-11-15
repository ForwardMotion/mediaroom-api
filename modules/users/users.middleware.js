if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const db_path =  `http://${process.env.USERS_DB_USERNAME}:${process.env.USERS_DB_PASSWORD}@${process.env.USERS_DB_HOST}:${process.env.USERS_DB_PORT}`;

/*
 * This middleware authenticates the user.
 */
module.exports = async function(req, res, next) {
    var auth_cookie = req.cookies['AuthSession'];
    if (auth_cookie) {
        try {
            const nano = require('nano')({url: db_path, cookie: 'AuthSession='+auth_cookie, requestDefaults: {jar:true}});
            req.session = await nano.session();
            req.db = nano;
            next();
        } catch (error) {
            // Just assume they aren't authenticated.
        }
    }

    const nano = require('nano')({url: db_path, requestDefaults: {jar:true}});
    req.session = null;
    req.db = nano;
    next();
}
