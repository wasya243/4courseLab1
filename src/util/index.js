module.exports = {
    composeLog,
};


function getRequestInfo(request) {
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    const { browser, version } = request.useragent;
    const timeOfRequest = new Date();

    return {
        ip,
        browser,
        version,
        timeOfRequest
    };
}

function composeLog(request) {
    const { ip, browser, version, timeOfRequest } = getRequestInfo(request);
    const log = `$Request made from ${ip} using browser ${browser} of ${version} version at ${timeOfRequest}\n`;

    return new Uint8Array(Buffer.from(log));
}
