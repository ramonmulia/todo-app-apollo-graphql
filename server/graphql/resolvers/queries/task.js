const ObjectID = require('mongodb').ObjectID;

function Tasks(root, args, { db }) {
    return db.collection('tasks')
        .find(args)
        .toArray();
}

const Task = (root, args, { db }) => {
    const query = args._id ? { _id: new ObjectID(args._id) } : args;

    return db
        .collection('tasks')
        .findOne(query);
}

module.exports = {
    Tasks,
    Task
};
