const http = require('http');
const url = require('url');
const query = require('querystring');

const { getIndex, getCSS } = require('./htmlResponses.js');
const { success, badRequest, unauthorized, forbidden, internal, notImplemented, notFound } = require('./dataResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': getIndex,
    '/style.css': getCSS,
    '/getUsers': success,
    '/notReal': badRequest,
    notFound: notFound
};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const params = query.parse(parsedUrl.query);

    const acceptedTypes = request.headers.accept.split(',');

    if (urlStruct[parsedUrl.pathname]) {
        return urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
    } else {
        return urlStruct.notFound(request, response, acceptedTypes);
    }
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
});