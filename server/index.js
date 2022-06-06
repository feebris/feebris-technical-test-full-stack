const { ApolloServer } = require('apollo-server');
const fs = require('fs').promises;
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const readDataFile = (path) =>
  fs.readFile(`./data/${path}`, 'utf8').then((data) => JSON.parse(data));

const resolveContext = () =>
  Promise.all([
    readDataFile('care_homes.json'),
    readDataFile('patients.json'),
    readDataFile('gp_practices.json'),
    readDataFile('gp_practices_patients.json'),
    readDataFile('checkups.json'),
  ]).then((results) => ({
    careHomes: results[0],
    patients: results[1],
    gpPractices: results[2],
    gpPracticePatients: results[3],
    checkups: results[4],
  }));

const createApolloServer = async (options = { port: 3000 }) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: resolveContext,
    introspection: true,
  });

  const serverInfo = await server.listen(options);

  if (process.env.NODE_ENV !== 'test') {
    console.log(`🚀  Server ready at ${serverInfo.url}`);
  }

  return serverInfo;
};

module.exports = { createApolloServer };
