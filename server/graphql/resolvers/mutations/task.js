
const ObjectID = require('mongodb').ObjectID;

async function createTask(_, { task }, { db }) {
    task.date = new Date().toLocaleDateString();

    const taskCreated = await db.collection('tasks').insertOne(task);
    return  taskCreated.ops[0];
}

module.exports = {
    createTask
}
