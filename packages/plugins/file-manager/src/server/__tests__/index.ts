import { MockServer, mockServer } from '@nocobase/test';
import path from 'path';
import supertest from 'supertest';

import plugin from '../';

export async function getApp(options = {}): Promise<MockServer> {
  const app = mockServer({
    ...options,
    cors: {
      origin: '*',
    },
    acl: false,
  });

  await app.cleanDb();

  app.plugin(plugin);

  app.db.import({
    directory: path.resolve(__dirname, './tables'),
  });

  await app.loadAndInstall();

  return app;
}

// because the app in supertest will use a random port
export function requestFile(url, agent) {
  // url starts with double slash "//" will be considered as http or https
  // url starts with single slash "/" will be considered from local server
  return url[0] === '/' && url[1] !== '/' ? agent.get(url) : supertest.agent(url).get('');
}
