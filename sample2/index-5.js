const server1 = require('./server-5');
const router1 = require('./router-5');
const reqHandler1 = require('./handler-5');

const handle = {
  '/': reqHandler1.urlHome,
  '/admin': reqHandler1.urlHome,
  '/html': reqHandler1.urlHtml,
  // ['/test' + req.url.substring(5)]: reqHandler1.urlTest,
  '/data': reqHandler1.urlData,
};

server1.start(router1.route, handle);
