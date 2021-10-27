const kue = require('kue');

// we can have several workers woring under the same queue
const queue = kue.createQueue();

module.exports = queue;