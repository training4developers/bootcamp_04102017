/* eslint-disable strict */
'use strict';

// starts the web server using the configuation loaded from package.json
const { graphQLServer } = require('./package.json');

require('./dist/server.js').default({ graphQLServer });
