const db = require("./../dbconfig");

users = () => {
    return db('users').select(
      'firebase_id', 
      'email', 
      'first_name', 
      'last_name', 
      'address',
      'city',
      'state',
      'zip',
      'phone',
      'admin',
      )
};

addUser = (user) => {
    return db('users').insert(user)
};

editUser = (user, id) => {
    return db('users').where({firebase_id: id}).update(user) 
};

deleteUser = (id) => {
    return db('users').where({'firebase_id': id}).delete()
};


userById = (firebase_id) => {
    return db("users").where({ 'firebase_id': firebase_id }).first();
};

module.exports = {
    users,
    userById,
    addUser,
    editUser,
    deleteUser,
};