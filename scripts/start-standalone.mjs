// Keep the port and hostname flags accepted by npm start with next start.
import { parseArgs } from 'node:util';

const { values } = parseArgs({
  options: {
    port: { type: 'string', short: 'p' },
    hostname: { type: 'string', short: 'H' },
    keepAliveTimeout: { type: 'string' },
  },
});

if (values.port) process.env.PORT = values.port;
if (values.hostname) process.env.HOSTNAME = values.hostname;
if (values.keepAliveTimeout) process.env.KEEP_ALIVE_TIMEOUT = values.keepAliveTimeout;

await import('../.next/standalone/server.js');
