import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const Home = () => {
  const { loading, data } = useQuery(gql`
    query GetCareHomes {
      careHomes {
        name
        patients {
          id
          firstName
          lastName
          gpPractices {
            name
          }
        }
      }
    }
  `);

  if (loading || !data) return null;

  const { careHomes } = data;
  return (
    <div>
      <h1>Feebris</h1>
      <h2>Care Homes</h2>

      {careHomes.length && (
        <ul>
          {careHomes.map(({ name, patients }) => (
            <li key={name}>
              <h3>{name}</h3>
              <ul>
                {patients.map(({ id, firstName, lastName, gpPractices }) => (
                  <li key={id}>
                    <Link to={`/patients/${id}`}>
                      {firstName} {lastName}
                    </Link>{' '}
                    {gpPractices.length &&
                      `GP practice(s): ${gpPractices.map(({ name }) => name).join(', ')}`}
                    {!gpPractices.length && <i>not registered with a GP practice</i>}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      {!careHomes.length && (
        <p>
          <i>No registered care homes.</i>
        </p>
      )}
    </div>
  );
};

export default Home;
