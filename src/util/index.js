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

function getProps(template) {
    const regex = /\${(.*?)\}/gm;
    const matches = [];

    let lastMatch;
    do {
        lastMatch = regex.exec(template);
        if (lastMatch) {
            matches.push(lastMatch[1]);
        }
    } while (lastMatch !== null);

    return matches;
}

function composeLog(request, template) {
    // get req obj info
    const reqInfo = getRequestInfo(request);
    // get subset of prop to use in log
    const propsToUse = getProps(template);
    let templateCopy = template.slice();

    propsToUse.forEach(prop => templateCopy = templateCopy.replace(`\$\{${prop}\}`, reqInfo[prop]));

    return new Uint8Array(Buffer.from(templateCopy));
}
