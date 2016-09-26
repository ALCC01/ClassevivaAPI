Session
=======

Questa pagina copre la documentazione per l'oggetto ``Session``.

.. js:class:: Session(sessionId)

    :param string sessionId: Un sessionId valido per il frontend Spaggiari
    :returns: Un oggetto Sessione

    Crea un oggetto sessione che rappresenta la sessione autenticata e funziona come tramite fra l'utente della libreria
    e il sito effettivo.

.. js:function:: profile()

    :returns: Una promise che restituisce un oggetto.

    Restituisce una promise che restituisce un oggetto che contiene il nome e il cognorme dell'utente (il sito tratta
    l'intero nome come una singola entità, quindi risulterà essere qualcosa sulla falsa riga di ``MARIO ROSSI``) e il
    nome della scuola (non è stato osservato nessuno standard per questo dato, potrebbe risultare quindi essere solo il
    nome della scuola o la sua intera denominazione, inclusa la poizione, il customer code e il codice meccanografico).

    .. code-block:: javascript
        :linenos:

        {
            name: 'MARIO ROSSI',
            school: 'GGSR443434 - LICEO CLASSICO STATALE "M. ROSSI"'
        }

.. js:function:: grades()

    :returns: Una promise che restituisce un oggetto.

    Restituisce una promise che restituisce un oggetto che contiene i voti dell'utente o le sue annotazioni (come ``G``
    o ``A``).

    .. code-block:: javascript
        :linenos:

        {
            'lingua e letteratura italiana': [
                {
                    grade: '9-',
                    type: 'Scritto/Grafico',
                    date: '25/12'
                },
                ...
            ]
            ...
        }

.. js:function:: agenda(start, end)

    :param number start: Il timestamp di partenza per il lasso di tempo selezionato.
    :param number end: Il timestamp di arrivo per il lasso di tempo selezionato.
    :returns: Una promise che restituisce un array.

    Restituisce una promise che restituisce un array delle annotazioni sull'agenda dell'utente, se presenti. Sia il campo
    start che quello end sono richiesti.

    .. code-block:: javascript
        :linenos:

        [
            {
                id: '0000',
                title: 'Verifica scritta di analisi del testo.',
                start: '2015-10-24 14:30:00',
                end: '2015-10-24 16:30:00',
                allDay: false,
                data_inserimento: '24-11-2015 13:50:30',
                nota_2: 'Verifica scritta di analisi del testo.',
                master_id: null,
                classe_id: '000000',
                classe_desc: '',
                gruppo: 0,
                autore_desc: 'CRISTINA ROSSI',
                autore_id: '0000000',
                tipo: 'nota'
            },
            ...
        ]

.. js:function:: files()

    :returns: Una promise che restituisce un oggetto.

    Restituisce una promise che restituisce un oggetto.

    .. code-block:: javascript
        :linenos:

        {
            "CRISTINA ROSSI": [
                {
                    "name": "Folder name",
                    "list": [
                        {
                            "file": "File name",
                            "id": "numeric file id",
                            "url": "file url"
                        },
                        ...
                    ]
                },
                ...
            ]
        }