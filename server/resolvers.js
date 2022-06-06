const calculateMeanSpO2FromCsv = require('./helpers.js').calculateMeanSpO2FromCsv;
const { resolvers: scalarResolvers } = require('graphql-scalars');
const fs = require('fs');

const resolvers = {
  ...scalarResolvers,

  Query: {
    careHomes(_1, _2, context) {
      return context.careHomes;
    },
    patient(_, args, context) {
      return context.patients.find((patient) => patient.id === args.id);
    },
    checkup(_, args, context) {
      return context.checkups.find((checkup) => checkup.id === args.id);
    },
  },

  CareHome: {
    patients(parent, _, context) {
      return context.patients.filter((patient) => patient.careHomeId === parent.id);
    },
  },

  Patient: {
    careHome(parent, _, context) {
      return context.careHomes.find((careHome) => careHome.id === parent.careHomeId);
    },

    gpPractices(parent, _, context) {
      return context.gpPracticePatients
        .filter(({ patientId: gpPatientId }) => gpPatientId === parent.id)
        .map(({ gpPracticeId }) => context.gpPractices.find(({ id }) => id === gpPracticeId))
        .filter((gpPractice) => gpPractice !== undefined);
    },

    checkups(parent, _, context) {
      return context.checkups.filter(({ patientId }) => patientId === parent.id);
    },
  },

  Checkup: {
    patient(parent, _, context) {
      return context.patients.find((patients) => patients.id === parent.patientId);
    },

    meanSpO2(parent) {
      const normalizedId = parent.id > 9 ? String(parent.id) : `0${parent.id}`;
      const fileName = `./data/pulseox/${normalizedId}.csv`;

      if (!fs.existsSync(fileName)) {
        return;
      }

      return calculateMeanSpO2FromCsv(`./data/pulseox/${normalizedId}.csv`);
    },
  },
};

module.exports = resolvers;
