const server1 = require('./server-7');
const router1 = require('./router-7');
const reqHandler1 = require('./handler-7');

const handle = {
  '/': reqHandler1.urlHome,
  '/admin': reqHandler1.urlHome,
  '/html': reqHandler1.urlHtml,
  // '/error': reqHandler1.urlError,
  // ['/test' + req.url.substring(5)]: reqHandler1.urlTest,
  '/data': reqHandler1.urlData,
  // '/upload': reqHandler1.urlUpload,
  '/uploadfile': reqHandler1.urlUploadfile,
  '/show': reqHandler1.urlShow,
};

server1.start(router1.route, handle);
