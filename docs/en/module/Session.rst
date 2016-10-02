Session
=======

This page covers the ``Session`` object.

.. js:class:: Session(sessionId)

    :param string sessionId: A valid sessionId for the Spaggiari's frontend
    :returns: A Session object

    Creates a Session object that represents the authenticated session and works as a gateway between the library user and
    the actual website.

.. js:function:: profile()

    :returns: A promise that resolves to an object.

    Returns a promise that resolves to an object containing the user first and last name (the whole name is displayed as
    a single entity, so it will look like something along the lines of ``MARIO ROSSI``) and the school name (there is no
    observed standard format for this, it may well be only the school name or the entire denomination, including location,
    customer code and mechanographical code).

    .. code-block:: javascript
        :linenos:

        {
            name: 'MARIO ROSSI',
            school: 'GGSR443434 - LICEO CLASSICO STATALE "M. ROSSI"'
        }

.. js:function:: grades()

    :returns: A promise that resolves to an object.

    Returns a promise that resolves to an object containing the user's grades or annotations (like ``G`` or ``A``).

    .. code-block:: javascript
        :linenos:

        {
            lingua e letteratura italiana: [
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

    :param number start: The starting timestamp of the chosen time frame.
    :param number end: The ending timestamp of the chosen time frame.
    :returns: A promise that resolves to an array.

    Returns a promise that resolves to an array of the annotations on the user's agenda, if any. Both the start and the
    end filed are required.

    .. code-block:: javascript
        :linenos:

        [
            {
                id: '0000', // The annotation id
                title: 'Verifica scritta di analisi del testo.', // Annotation title
                start: '2015-10-24 14:30:00', // Time frame
                end: '2015-10-24 16:30:00', // Time frame
                allDay: false,
                data_inserimento: '24-11-2015 13:50:30', // Creation date
                nota_2: 'Verifica scritta di analisi del testo.', // Annotation content/title
                master_id: null,
                classe_id: '000000', // Class id
                classe_desc: '', // Class description
                gruppo: 0,
                autore_desc: 'CRISTINA ROSSI', // Annotation author
                autore_id: '0000000', // Author ID
                tipo: 'nota' // Annotation type
            },
            ...
        ]

.. js:function:: files()

    :returns: A promise that resolves to an object.

    Returns a promise that resolves to an object.

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

.. js:function:: notes()

    :returns: A promise that resolves to an array.

    Returns a promise that resolves to an array representing the user's notes and sanctions.

    .. code-block:: javascript
        :linenos:

        [
            {
                "teacher": "CRISTINA ROSSI",
                "date": "29-07-2016",
                "content": "2 cool 4 school",
                "type": "Annotazione del docente"
            },
            ...
        ]