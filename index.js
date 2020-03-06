'use strict';

module.exports = {};
const request = require('request-promise'),
    cheerio = require('cheerio'),
    Session = module.exports.Session = require('./lib/Session.js');

module.exports.login = (options) => {
    var postData = {
            'cid': options.custcode,
            'uid': options.usercode,
            'pwd': options.password,
            'pin': options.pin
        },
        req = {
            method: 'POST',
            uri: 'https://web.spaggiari.eu/auth-p7/app/default/AuthApi4.php?a=aLoginPwd',
            form: postData,
            json: true,
            resolveWithFullResponse: true,
        };
    return request(req)
        .then(res => {
            var result = {};
            var cookies = parseCookies(res.caseless.dict['set-cookie']);
            if (cookies.PHPSESSID) {
                result.sessionId = cookies.PHPSESSID;
            } else throw new Error('Invalid session token');
            if (res.body.data.auth.verified && res.body.data.auth.loggedIn) {
                return new Session(result.sessionId)
            } else throw new Error(res.body.error[0] || res.body.data.auth.errors[0] || 'Failed to authenticate')
        })
};

function parseCookies(cookies) {
    var r = {};
    cookies.forEach(cookie => {
        r[cookie.substr(0, 9)] = cookie.substr(10, 32)
    });
    return r;
}
