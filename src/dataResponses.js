const respondData = (request, response, status, object, acceptedTypes) => {
    if (acceptedTypes[0] === 'text/xml') {

        let xmlResponse = `<response><message>${object.message}</message>`;
        if (object.id) {
            xmlResponse += `<id>${object.id}</id>`;
        }
        xmlResponse += `</response>`;

        response.writeHead(status, { 'Content-Type': acceptedTypes });
        response.write(xmlResponse);
        response.end();
    } else {
        response.writeHead(status, { 'Content-Type': acceptedTypes });
        response.write(JSON.stringify(object));
        response.end();
    }
};

const success = (request, response, acceptedTypes) => {
    const responseData = {
        message: "This is a successful response"
    };

    return respondData(request, response, 200, responseData, acceptedTypes);
};

const badRequest = (request, response, acceptedTypes, params) => {
    const responseData = {
        message: "This request has the required parameters"
    };

    if (!params.valid || params.valid !== 'true') {
        responseData.message = "Missing valid query parameter set to true",
        responseData.id = "badRequest";
        return respondData(request, response, 400, responseData, acceptedTypes);
    }

    return respondData(request, response, 200, responseData, acceptedTypes);
};

const unauthorized = (request, response, acceptedTypes, params) => {
    const responseData = {
        message: "This request has the required parameters"
    };

    if (!params.loggedIn || params.loggedIn !== 'yes') {
        responseData.message = "Missing loggedIn query parameter set to yes",
        responseData.id = "unauthorized";
        return respondData(request, response, 401, responseData, acceptedTypes);
    }

    return respondData(request, response, 200, responseData, acceptedTypes);
};

const forbidden = (request, response, acceptedTypes) => {
    const responseData = {
        message: "You do not have access to this content.",
        id: "forbidden"
    };

    return respondData(request, response, 403, responseData, acceptedTypes);
}

const internal = (request, response, acceptedTypes) => {
    const responseData = {
        message: "Internal Server Error. Something went wrong.",
        id: "internalError"
    };

    return respondData(request, response, 500, responseData, acceptedTypes);
}

const notImplemented = (request, response, acceptedTypes) => {
    const responseData = {
        message: "A get request for this page has not been implemented yet. Check again later for updated content.",
        id: "notImplemented"
    };

    return respondData(request, response, 501, responseData, acceptedTypes);
}

const notFound = (request, response, acceptedTypes) => {
    const responseData = {
        message: "The page you are looking for was not found.",
        id: "notFound"
    };

    return respondData(request, response, 404, responseData, acceptedTypes);
}

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound
};