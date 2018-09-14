const EventEmitter = require('events');

class MyClsEmitter extends EventEmitter { }
const myEmitter = new MyClsEmitter();

// 增加偵聽器限制數量，可以避免出現警告 15132
myEmitter.setMaxListeners(11);

for (let i = 0; i < 11; i++) {
  myEmitter.on('event', _ => console.log(i));
}

myEmitter.emit('event');

// 當您為一個特定事件添加十個以上的偵聽器到事件發射器時，Node.js會向stderr發送警告。
// stdout(stderr) console:
// (node:15132) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. \
// 11 event listeners added. Use emitter.setMaxListeners() to increase limit
