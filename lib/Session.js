'use strict';
const extend = require('util')._extend,
    cheerio = require('cheerio'),
    request = require('request-promise');

function Session(sessionId) {
    this.sessionId = sessionId;
    this.global_base_url = "https://web.spaggiari.eu/home/app/default/";
    this.base_url = "https://web.spaggiari.eu/cvv/app/default/";
    this.user_agent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36";

    this.request = (path) => {
        return request({
            uri: path,
            headers: {
                'User-Agent': this.user_agent,
                'Set-Cookie': "PHPSESSID=" + this.sessionId,
                'Cookie': "PHPSESSID=" + this.sessionId
            }
        })
    };

    this.profile = () => {
        return this.request(this.global_base_url + "menu_webinfoschool_genitori.php", {})
            .then(res => {
                var $ = cheerio.load(res);
                var result = {};
                if ($('.name').length) {
                    result.name = $('.name').text();
                    result.school = $('.scuola').text();
                    return result;
                } else throw new Error("Invalid or expired session ID")
            })
    };

    this.grades = () => {
        return this.request(this.base_url + "genitori_note.php", {})
            .then(res => {
                var $ = cheerio.load(res),
                    grades = {},
                    subject =  [];
                if ($('.name').length) {
                    $('#data_table_2 tr').not('#placeholder_row').each(function (i, e) {
                        if ($(this).children('td').first().text().match(/[a-z]/i)) {
                            var entry = $(this).children('td').first().text().replace(/(\n)/gm, "");
                            if (entry != subject) {
                                grades[entry] = [];
                                subject = entry;
                            }
                        } else {
                            var entry = $(this).children('td').eq(1).children('div').children('p').text(),
                                what = $(this).children('td').eq(1).children('p').text().split(" - "),
                                gradetype = what[0],
                                date = what[1];
                            grades[subject].push({grade: entry, type: gradetype, date: date});
                        }
                    });
                    return grades;
                } else throw new Error("Invalid or expired session ID")
            })
    };

    this.agenda = (start, end) => {
        return this.request(this.base_url + "agenda_studenti.php?ope=get_events&classe_id=&gruppo_id=&start=" + start + "&end=" + end)
            .then(res => {
                try {
                    return JSON.parse(res);
                } catch (err) {
                    throw new Error("Invalid or expired session ID")
                }
            })
    };

    this.files = () => {
        return this.request(this.base_url + "didattica_genitori.php")
            .then(res => {
                var $ = cheerio.load(res),
                    files = {},
                    teacher = "";
                if ($('.name').length) {
                    $('#data_table tr').slice(9).each(function (i, e) {
                        var entry = $(this);
                        if (entry.attr('style') == "height: 40px;") {
                            teacher = entry.text().slice(21, -7);
                            files[teacher] = [];
                        }
                        if (entry.hasClass('row_parent')) {
                            var name = entry.text().slice(5, -4);
                            files[teacher].push({"name": name, "list": []});
                        }
                        if (entry.hasClass('contenuto')) {
                            var name = entry.children('.contenuto_desc').children('div').children('span').eq(0).text()
                            files[teacher][files[teacher].length - 1]['list'].push({
                                "file": name,
                                "id": entry.attr('contenuto_id'),
                                "url": this.base_url + "didattica_genitori.php?a=downloadContenuto&contenuto_id=" + entry.attr('contenuto_id')
                            });
                        }
                    });
                    return files;
                } else throw new Error("Invalid or expired session ID")
            })
    }
}

module.exports = Session;