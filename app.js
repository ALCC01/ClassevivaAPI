'use strict';
const express = require('express'),
	request = require('request'),
	cheerio = require('cheerio'),
	config = require('./config.json'),
	app = express(),
	global_base_url = "https://web.spaggiari.eu/home/app/default/",
	base_url = "https://web.spaggiari.eu/cvv/app/default/",
	// Common user agent
	user_agent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36";

app.get('/', function (req, res) {
	res.send('{"status":"error"}')
});

app.get('/:custcode/:usercode/:password', (req, res) => {
	var url = global_base_url + "login.php?custcode="+ req.params.custcode +"&login="+ req.params.usercode +"&password="+ req.params.password;
	var jar = request.jar();
	request({url: url, jar: jar}, (error, response, body) => {
		var $ = cheerio.load(body);
		var result = {};
		if (error) return res.send('{"status":"error"}');
		if ($('.name').length) {
			result.status = "OK";
			result.sessionId = jar.getCookies(url)[0].value;
			res.send(result);
		} else {
			res.send('{"status":"error"}');
		}
	});
});

app.get('/:custcode/:usercode/:password/:mode', (req, res) => {
	var custcode = req.params.custcode,
		login = req.params.usercode,
		password = req.params.password,
		mode = req.params.mode,
		script = mode.toLowerCase() === "email" ? "login_email.php" : "login.php";
	var url = `${global_base_url}${script}?custcode=${custcode}&login=${login}&password=${password}&mode=${mode}`;
	//var url = global_base_url + "login.php?custcode="+ req.params.custcode +"&login="+ req.params.usercode +"&password="+ req.params.password + "&mode=" + req.params.mode;
	var jar = request.jar();
	request({url: url, jar: jar}, (error, response, body) => {
		var $ = cheerio.load(body);
		var result = {};
		if (error) return res.send('{"status":"error"}');
		if ($('.name').length) {
			result.status = "OK";
			result.sessionId = jar.getCookies(url)[0].value;
			res.send(result);
		} else {
			res.send('{"status":"error"}');
		}
	});
});

app.get('/:sessionId/', (req, res) => {
	var url = global_base_url + "menu_webinfoschool_genitori.php";
	request({url: url, headers: {'User-Agent': user_agent,
		'Set-Cookie': "PHPSESSID=" + req.params.sessionId,
		'Cookie': "PHPSESSID=" + req.params.sessionId}
	}, (error, response, body) => {
		var $ = cheerio.load(body);
		if (error) return res.send('{"status":"error"}');
		if ($('.name').length) {
			var result = {};
			result.status = "OK";
			result.name = $('.name').text();
			result.school = $('.scuola').text();
			res.send(result);
		} else {
			res.send('{"status":"error"}');
		}
	});
});

app.get('/:sessionId/grades', (req, res) => {
	var url = base_url + "genitori_note.php";
	request({url: url, headers: {'User-Agent': user_agent,
		'Set-Cookie': "PHPSESSID=" + req.params.sessionId,
		'Cookie': "PHPSESSID=" + req.params.sessionId}
	}, (error, response, body) => {
		var $ = cheerio.load(body),
			result = {},
			grades = {},
			subject =  [];
		if (error) return res.send('{"status":"error"}');
		if ($('.name').length) {
			$('#data_table_2 tr').not('#placeholder_row').each(function (i, e) {
				if ($(this).children('td').first().text().match(/[a-z]/i)) {
					var entry = $(this).children('td').first().text().replace(/(\n)/gm, "");
					if (entry != subject) {
						grades[entry] = [];
						subject = entry;
					}
				} else {
					var entry = $(this).children('td').eq(1).children('div').children('p').text();
					var what = $(this).children('td').eq(1).children('p').text().split(" - ");
					var gradetype = what[0];
					var date = what[1];
					grades[subject].push({grade: entry, type: gradetype, date: date});
				}
			});
			result.status = "OK";
			result.grades = grades;
			res.send(result);
		} else {
			res.send('{"status":"error"}');
		}
	});
});

app.get('/:sessionId/agenda', (req, res) => {
	var url = base_url + "agenda_studenti.php?ope=get_events&classe_id=&gruppo_id=&start=" + parseInt(((new Date).getTime() / 1000 - 8640000)) + "&end=" + parseInt(((new Date).getTime() / 1000 + 86400 * 7));
	request({url: url, headers: {'User-Agent': user_agent,
		'Set-Cookie': "PHPSESSID=" + req.params.sessionId,
		'Cookie': "PHPSESSID=" + req.params.sessionId}
	}, (error, response, body) => {
		var result = {};
		if (error) return res.send('{"status":"error"}');
		if (body !== 'null') {
			result.status = "OK";
			result.agenda = JSON.parse(body);
			res.send(result);
		} else {
			res.send('{"status":"error"}')
		}
	});
});

app.get('/:sessionId/files', (req, res) => {
	var url = base_url + "didattica_genitori.php";
	request({url: url, headers: {'User-Agent': user_agent,
		'Set-Cookie': "PHPSESSID=" + req.params.sessionId,
		'Cookie': "PHPSESSID=" + req.params.sessionId}
	}, (error, response, body) => {
		var $ = cheerio.load(body),
			files = {},
			result = {},
			teacher = "";
		if (error) return res.send('{"status":"error"}');
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
						"url": base_url + "didattica_genitori.php?a=downloadContenuto&contenuto_id=" + entry.attr('contenuto_id')
					});
				}
			});
			result.status = "OK";
			result.files = files;
			res.send(result);
		} else {
			res.send('{"status":"error"}')
		}
	});
});

var server = app.listen(process.env.PORT || config.port || 8080, () => {
	var port = server.address().port;
	console.log(`Classeviva API listening on port ${port}`);
});
