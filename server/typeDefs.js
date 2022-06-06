const { gql } = require('apollo-server');
const { typeDefs: scalarTypeDefs } = require('graphql-scalars');

const typeDefs = gql`
  type Patient {
    id: ID!
    firstName: String!
    lastName: String!
    careHome: CareHome!
    gpPractices: [GpPractice]!
    checkups: [Checkup]!
  }

  type CareHome {
    id: ID!
    name: String!
    patients: [Patient]!
  }

  type GpPractice {
    id: Int!
    name: String!
  }

  type Checkup {
    id: Int!
    patientId: Int!
    createdAt: Int!
    meanSpO2: Float
    patient: Patient!
  }

  type GpPracticePatient {
    patientId: Int
    gpPracticeId: Int
  }

  type Query {
    careHomes: [CareHome]!
    patient(id: Int): Patient
    checkup(id: Int): Checkup
  }
`;

module.exports = [scalarTypeDefs, typeDefs];
