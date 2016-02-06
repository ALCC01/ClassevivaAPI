var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var global_base_url = "https://web.spaggiari.eu/home/app/default/";
var base_url = "https://web.spaggiari.eu/cvv/app/default/";

app.get('/', function (req, res) {
	res.send("No arguments provided")
});

app.get('/:custcode/:usercode/:password', function (req, res) {
	var url = global_base_url + "login.php?custcode="+ req.params.custcode +"&login="+ req.params.usercode +"&password="+ req.params.password + "&mode=custcode";
	var jar = request.jar();
	request({url: url, jar: jar}, function(error, response, body) {
		  $ = cheerio.load(body);
		  if ($('.name').length) {
		  	res.send('{"status":"OK", "sessionId":"' + jar.getCookies(url)[0].value + '"}');
		  } else {
		  	res.send('{"status":"error"}');
		  }
	});
});

app.get('/:sessionId/', function (req, res) {
	var url = global_base_url + "menu_webinfoschool_genitori.php";
	request({url: url, /*jar: jar*/ headers: {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:37.0) Gecko/20100101 Firefox/37.0',
	            'Set-Cookie': "PHPSESSID=" + req.params.sessionId,
	            'Cookie': "PHPSESSID=" + req.params.sessionId}
	}, function(error, response, body) {
		$ = cheerio.load(body);
		if ($('.name').length) {
			var result = new Object();
			result['status'] = "OK";
			result['name'] = $('.name').text();
			result['school'] = $('.scuola').text();
			res.send(JSON.stringify(result));
		} else {
			res.send('{"status":"error"}');
		}
	});
});

app.get('/:sessionId/votes', function (req, res) {
	var url = base_url + "genitori_note.php";
	request({url: url, /*jar: jar*/ headers: {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:37.0) Gecko/20100101 Firefox/37.0',
	            'Set-Cookie': "PHPSESSID=" + req.params.sessionId,
	            'Cookie': "PHPSESSID=" + req.params.sessionId}
	}, function(error, response, body) {
		$ = cheerio.load(body);
		var votes = new Object();
		var subject =  [];
		$('#data_table_2 tr').not('#placeholder_row').each(function(i, e) {
			if ($(this).children('td').first().text().match(/[a-z]/i)) {
				var entry = $(this).children('td').first().text().replace(/(\n)/gm, "");
				if (entry != subject) {
					  votes[entry] = [];
					  subject = entry;
				}
			} else {
				var entry = $(this).children('td').eq(1).children('div').children('p').text();
				var what = $(this).children('td').eq(1).children('p').text()
				votes[subject].push({vote:entry, type:what});
			}
		});
		res.send(votes);
	});
});

app.get('/:sessionId/agenda', function (req, res) {
	var url = base_url + "agenda_studenti.php?ope=get_events&classe_id=&gruppo_id=&start=" + parseInt(((new Date).getTime() / 1000 - 86400)) + "&end=" + parseInt(((new Date).getTime() / 1000 + 86400 * 7));
	request({url: url, /*jar: jar*/ headers: {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:37.0) Gecko/20100101 Firefox/37.0',
	            'Set-Cookie': "PHPSESSID=" + req.params.sessionId,
	            'Cookie': "PHPSESSID=" + req.params.sessionId}
	}, function(error, response, body) {
		$ = cheerio.load(body);
		res.send(body);
	});
});

app.get('/:sessionId/files', function (req, res) {
	var url = base_url + "didattica_genitori.php";
	request({url: url, /*jar: jar*/ headers: {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:37.0) Gecko/20100101 Firefox/37.0',
		'Set-Cookie': "PHPSESSID=" + req.params.sessionId,
		'Cookie': "PHPSESSID=" + req.params.sessionId}
	}, function(error, response, body) {
		$ = cheerio.load(body);

		var files = {};
		var teacher = "";
		$('#data_table tr').slice(9).each(function(i, e) {
			var entry = $(this);
			if (entry.attr('style') == "height: 40px;") {
				teacher = entry.text().slice(21, -7);
				files[teacher] = [];
			}
			if (entry.hasClass('row_parent')) {
				var name = entry.text().slice(5, -4);
				files[teacher].push({"name":name, "list":[]});
			}
			if (entry.hasClass('contenuto')) {
				var name = entry.children('.contenuto_desc').children('div').children('span').eq(0).text()
			  	files[teacher][files[teacher].length-1]['list'].push({"file":name, "id":entry.attr('contenuto_id'), "url":base_url + "didattica_genitori.php?a=downloadContenuto&contenuto_id=" + entry.attr('contenuto_id')});	
			}
		});
		res.send(files);
	});
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Classeviva API listening on port %s', host, port);
});