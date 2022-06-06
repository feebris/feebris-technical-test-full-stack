import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

const Patient = () => {
  const { patientId } = useParams();

  const { loading, data } = useQuery(gql`
    query GetPatient {
      patient(id: ${patientId}) {
        firstName
        lastName
        careHome {
          name
        }
        checkups {
          id
          createdAt
          meanSpO2
        }
      }
    }
  `);

  if (loading || !data) return null;

  const { patient } = data;

  return (
    <>
      <h2>
        {patient.firstName} {patient.lastName}
      </h2>

      <h3>Care Home</h3>
      <p>{patient.careHome.name}</p>

      <h3>Check-ups</h3>
      {!Boolean(patient.checkups.length) && (
        <p>
          <i>No check-ups.</i>
        </p>
      )}
      {Boolean(patient.checkups.length) && (
        <ul>
          {patient.checkups.map(({ id, createdAt, meanSpO2 }) => (
            <li key={id}>
              <b>Time:</b> {new Date(createdAt).toUTCString()}
              {meanSpO2 && (
                <>
                  <b> - SpO2:</b> {meanSpO2.toFixed(1)}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Patient;
