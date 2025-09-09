import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { json } from 'body-parser';
import express from 'express';

import { createPrometheusExporterPlugin } from '../../lib/src';

import { readSchema } from './read-schema';
import { resolvers } from './resolvers';

export async function startServer(port: number = 4000, hostname: string = '0.0.0.0') {
  const app = express();

  const typeDefs = readSchema();

  // Create plugin first so it can register the /metrics endpoint
  const prometheusExporterPlugin = createPrometheusExporterPlugin({
    app
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [prometheusExporterPlugin],
    // Disable CSRF protection for development
    csrfPrevention: false
  });

  await server.start();

  // GraphQL endpoint only on /graphql path
  app.use('/graphql', json(), expressMiddleware(server));

  // Add a simple test route to verify Express routing is working
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  try {
    app.listen(port, hostname, () => {
      console.log(`🚀 App listening at http://${hostname}:${port}`);
    });
  } catch (error) {
    console.error('💥 Failed to start app!', error);
  }
}
