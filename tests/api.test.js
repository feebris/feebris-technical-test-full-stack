const fs = require('fs').promises;
const createApolloServer = require('../server').createApolloServer;
const request = require('supertest');
const calculateMeanSpO2FromCsv = require('../server/helpers').calculateMeanSpO2FromCsv;

describe('api', () => {
  let serverInfo;

  beforeAll(async () => {
    serverInfo = await createApolloServer({ port: 0 });
  });

  afterAll(async () => {
    await serverInfo.server.close();
  });

  it('should return data from GraphQL server', async () => {
    const queryData = {
      query: `
        query GetCareHomes {
          careHomes {
            name
          }
        }`,
    };

    const response = await request(serverInfo.url).post('/').send(queryData);
    expect(response.status).toBe(200);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).not.toBeNull();
  });

  it('should calculate mean spO2 for a checkup with pulse oximeter data', async () => {
    const checkups = await fs
      .readFile(`./data/checkups.json`, 'utf8')
      .then((data) => JSON.parse(data));

    const checkupWithPulseOxData = checkups.find((c) => c.pulseOximeterData);
    const meanSpO2 = await calculateMeanSpO2FromCsv(
      `./data/${checkupWithPulseOxData.pulseOximeterData[0]}`,
    );

    const queryData = {
      query: `
        query GetCheckups {
          checkup(id: ${checkupWithPulseOxData.id}) {
            meanSpO2
          }
        }`,
    };

    const response = await request(serverInfo.url).post('/').send(queryData);
    expect(response.status).toBe(200);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).not.toBeNull();
    expect(response.body.data.checkup.meanSpO2).toBe(meanSpO2);
  });
});
