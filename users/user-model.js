const db = require('../data/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById

}
function find() {
    return db('users').select('id', 'emailaddress');
}
function findBy(filter) {
    return db('users').where(filter);
}

function add(user) {
    return db('users').insert(user);
    // return findById(id);
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}