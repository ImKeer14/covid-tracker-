import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [cases, setCases] = useState([]);
  const [vaccinationStatus, setVaccinationStatus] = useState({});
  const [hospitalResources, setHospitalResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const caseData = await axios.get('http://localhost:5000/api/covid/cases');
        const vaccinationData = await axios.get('http://localhost:5000/api/covid/vaccination-status');
        const hospitalData = await axios.get('http://localhost:5000/api/covid/hospitals/resources');
        setCases(caseData.data);
        setVaccinationStatus(vaccinationData.data);
        setHospitalResources(hospitalData.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data.');
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>COVID-19 Dashboard</h1>
      
      <div>
        <h2>Cases</h2>
        {cases.length > 0 ? (
          cases.map((item, index) => (
            <div key={index}>
              <h3>{item.region}</h3>
              <p>Active: {item.activeCases}</p>
              <p>Recoveries: {item.recoveries}</p>
              <p>Deaths: {item.deaths}</p>
            </div>
          ))
        ) : (
          <p>No case data available.</p>
        )}
      </div>

      <div>
        <h2>Vaccination Status</h2>
        {vaccinationStatus ? (
          <>
            <p>Doses Given: {vaccinationStatus.dosesGiven}</p>
            <p>Percentage Vaccinated: {vaccinationStatus.percentageVaccinated}%</p>
          </>
        ) : (
          <p>No vaccination data available.</p>
        )}
      </div>

      <div>
        <h2>Hospital Resources</h2>
        {hospitalResources.length > 0 ? (
          hospitalResources.map((hospital, index) => (
            <div key={index}>
              <h3>{hospital.region}</h3>
              <p>Beds Available: {hospital.bedsAvailable}</p>
              <p>Ventilators Available: {hospital.ventilatorsAvailable}</p>
              <p>ICU Capacity: {hospital.ICUCapacity}</p>
            </div>
          ))
        ) : (
          <p>No hospital resource data available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
