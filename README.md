# ClassevivaAPI ![NPM](https://img.shields.io/npm/v/classeviva.svg)

ClassevivaAPI is a NodeJS module and a REST-like API that allows you to access to data from Spaggiari's Classeviva
electronic register.

Yup, parlo anche italiano. Più in basso il link alla documentazione italiana.

## Features

* **Versatile**. ClassevivaAPI can be used both as a REST API and a NodeJS module
* **Promises**. ClassevivaAPI takes full advantage of the NodeJS implementation of Promises, along with the recent ES6 Harmony specification
* ClassevivaAPI is fully open source project available on [GitHub](https://github.com/ALCC01/ClassevivaAPI) and [npm](https://www.npmjs.com/package/classeviva).

## How it works

In a nutshell, the library makes requests to the original website, parses the HTML code and returns data in JSON format, that can be implemented in pretty much every application.

## Documentation

Please refer to the [ClassevivaAPI Documentation](https://dev.albertocoscia.me/classeviva/). Fare riferimento alla [documentazione italiana di ClassevivaAPI](https://dev.albertocoscia.me/classeviva/it).

## Getting Started

### As a module

First, you'll need to install the module:

    npm i --save classeviva

Once the package is installed, you can star working with the library.

    const classeviva = require('classeviva');

    classeviva.login({
        usercode: 'G0000000A',
        password: 'plsdontsaveinplaintext'
    }).then(session => {
        session.grades().then(grades => {
            console.log(grades)
        })
    })

### As a REST API

First, clone the project repository (or access the library folder inside the ``node_modules``):

    git clone git@github.com:ALCC01/ClassevivaAPI.git

Then copy the ``config.dist.json`` file to ``config.json`` and start the server:

    npm start

## License

ClassevivaAPI is released under the GNU General Public License 3.0.

    ClassevivaAPI - Classeviva Electronic register (unofficial) parser & API
    Copyright (C) 2015-2016 Alberto Coscia <inbox@albertocoscia.me>

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