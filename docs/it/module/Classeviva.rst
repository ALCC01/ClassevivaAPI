Classeviva
==========

This page covers the ``index.js`` module file, i.e. the ``require('classeviva')`` object itself.

.. js:function:: login(options)

    :param object options: An object containing the data that will be provided when trying to authenticate.
    :returns: A promise that resolves to a :doc:`module/Session` object.

    Attempts to obtain a session token from Spaggiari's front end. If the request is successful and the user authenticates
    correctly, the promise returned will resolve to a Session object representing the session. Otherwhise, if the request fails
    either because of a connection error or of an authentication one, the promise will reject.

    Valid options are:

    .. code-block:: javascript
        :linenos:

        {
            custcode: 'string', // A school id/customer code (looks optional with the new authentication system)
            usercode: 'string', // The usercode or the email identifying the user
            password: 'string', // Please don't use stolen ones
            pin: 'string' // Looks like the authentication system could accept a pin instead of a password, but this functionality remains untested
        }
