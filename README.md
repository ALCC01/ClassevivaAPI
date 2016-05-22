# Classeviva API
Classeviva API is an unofficial Spaggiari's electronic register parser & REST API which translates the original spaghetti code of the service in something more readable — JSON objects. It is built on top of NodeJS with CheerioJS and ExpressJS.
## Features
By now, Classeviva API can provide you:
 * Login & session id
 * Grades
 * Agenda
 * Files
 
It obviously requires you to use a school id, a user id and a password. Since Spaggiari is not able to support email and userid login in the same script, email login is not currently supported.
## How does it work
In a nutshell, the Node application makes requests to the original website, parses the HTML code and returns data in JSON format, that can be implemented in pretty much every application.
## Endpoints
 * `/custcode/userid/password`
    * `custcode`: The school id. Do not ask me why Spaggiari has called it so.
    * `userid`: The user id provided by Spaggiari.
    * `password`: Does it even need an explanation?
    * Checks if the password matches and returns the session id that you will need for every other operation
    * Example output: `{"status":"OK", "sessionId":"<random alphanumeric 32chars-long string>"}`
 * `/sessionId`
    *  `sessionId`: The session id (hopefully, you obtained it with the previous endpoint)
    *  Returns the user name and the school name (you can use it to check if the session id is still valid too)
    *  Example output: `{"status":"OK","name":"FOO BAR","school":"FOOBAR Elementary School"}`
 * `/sessionId/grades`
    * Returns a JSON object containing all the user's grades
    * Example output: `{"storia":[{"grade":"5","type":"Orale:,"date":10/9"}],"inglese":[{"grade":"10","type":"Scritto/Grafico","date":"09/09"}]}`
 * `/sessionId/agenda`
    * Returns a JSON object containing the user's agenda from the previous day to the next week (will be changed to allow the use of custom timestamps)
 * `/sessionId/files`
    * Returns a JSON object containing all the files to which the user can access
    * Example output: `{"Teacher Name":[{"name":"Folder name","list":[{"file":"File name","id":"numeric file id","url":"https://web.spaggiari.eu/cvv/app/default/didattica_genitori.php?a=downloadContenuto&contenuto_id=[fileid]"}]}]}`

## Installation
Make sure you have installed NodeJS & npm
 * `git clone https://github.com/ALCC01/ClassevivaAPI.git`
 * `cd ClassevivaAPI`
 * `[sudo] npm install`
 * `node app.js`

## Contributing
Pull requests are welcome.
## License
ClassevivaAPI is released under GNU General Public License 3.0.

    Copyright (C) 2015 Alberto Coscia

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
