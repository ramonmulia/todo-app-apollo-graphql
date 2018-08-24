const taskMutations = require('./task');

module.exports = {
    Mutation: {
        ...taskMutations
    }
}