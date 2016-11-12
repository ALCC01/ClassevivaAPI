Benvenuto nella documentazione di ClassevivaAPI
===============================================

ClassevivaAPI è un modulo NodeJS e un'API REST-like che permette di accedere ai dati del registro elettronico Classeviva di Spaggiari.

=======
Feature
=======

* **Versatile**. ClassevivaAPI può essere usata sia come REST API che come modulo NodeJS
* **Promise**. ClassevivaAPI sfrutta pienamente l'implementazione NodeJS delle promise, assieme alla recente specifica ES6 Harmony.
* ClassevivaAPI è un progetto completamente opensource disponibile su `GitHub <https://github.com/ALCC01/ClassevivaAPI>`_ e `npm <https://www.npmjs.com/package/classeviva>`_.

=============
Come funziona
=============

In poche parole, la libreria esegue richieste al sito originale, effettua il parsing del codice HTML e restituisce dati nel formato JSON, che può essere implementato in più o meno qualsiasi linguaggio.

=============
Inizio rapido
=============

Come modulo
-----------

Come prima cosa, è necessario installare il modulo:

.. code-block:: none

    npm i --save classeviva

Una volta intallato, è possibile iniziare a lavorare con la libreria.

.. code-block:: javascript

    const classeviva = require('classeviva');

    classeviva.login({
        usercode: 'G0000000A',
        password: 'plsdontsaveinplaintext'
    }).then(session => {
        session.grades().then(grades => {
            console.log(grades)
        })
    })

Come REST API
-------------

Come prima cosa, è necessario clonare la repository del progetto (o accedere alla cartella della libreria all'interno a ``node_modules``):

.. code-block:: none

    git clone git@github.com:ALCC01/ClassevivaAPI.git

È poi necessario copiare il file ``config.dist.json`` nel file ``config.json`` e avviare il server:

.. code-block:: none

    npm start

=======
License
=======

ClassevivaAPI è rilasciato sotto la GNU General Public License 3.0.

.. code-block:: none

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

.. _user-documentation:
.. toctree::
    :maxdepth: 3
    :caption: Documentazione utente
    :glob:

    index

.. _module-documentation:
.. toctree::
    :maxdepth: 3
    :caption: Documentazione Modulo
    :glob:

    module/Classeviva
    module/Session