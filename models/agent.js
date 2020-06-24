const db = require("./../dbconfig");

addAgent = (user) => {
    return db('users').insert(user)
};

module.exports = {
    addAgent,
};