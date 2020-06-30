const db = require("./../dbconfig");

addAgent = (agent) => {
    return db('agents').insert(agent)
};

module.exports = {
    addAgent,
};