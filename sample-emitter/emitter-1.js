const EventEmitter = require('events');

class MyClsEmitter extends EventEmitter { }
const myEmitter = new MyClsEmitter();

myEmitter.on('event', () => {
  console.log('an event occurred!');
});

myEmitter.emit('event');
