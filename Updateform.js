import React, { useState } from 'react';
import axios from 'axios';

const UpdateForm = () => {
  const [region, setRegion] = useState('');
  const [activeCases, setActiveCases] = useState('');
  const [recoveries, setRecoveries] = useState('');
  const [deaths, setDeaths] = useState('');
  const [bedsAvailable, setBedsAvailable] = useState('');
  const [ventilatorsAvailable, setVentilatorsAvailable] = useState('');
  const [ICUCapacity, setICUCapacity] = useState('');

  const handleSubmitCases = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/covid/cases/update', {
        region,
        activeCases: parseInt(activeCases),
        recoveries: parseInt(recoveries),
        deaths: parseInt(deaths),
      });
      alert('Cases updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating cases');
    }
  };

  const handleSubmitResources = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/covid/hospitals/resources/update', {
        region,
        bedsAvailable: parseInt(bedsAvailable),
        ventilatorsAvailable: parseInt(ventilatorsAvailable),
        ICUCapacity: parseInt(ICUCapacity),
      });
      alert('Hospital resources updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating hospital resources');
    }
  };

  return (
    <div>
      <h2>Update COVID-19 Data</h2>
      <form onSubmit={handleSubmitCases}>
        <h3>Update Cases</h3>
        <input
          type="text"
          placeholder="Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <input
          type="number"
          placeholder="Active Cases"
          value={activeCases}
          onChange={(e) => setActiveCases(e.target.value)}
        />
        <input
          type="number"
          placeholder="Recoveries"
          value={recoveries}
          onChange={(e) => setRecoveries(e.target.value)}
        />
        <input
          type="number"
          placeholder="Deaths"
          value={deaths}
          onChange={(e) => setDeaths(e.target.value)}
        />
        <button type="submit">Update Cases</button>
      </form>

      <form onSubmit={handleSubmitResources}>
        <h3>Update Hospital Resources</h3>
        <input
          type="number"
          placeholder="Beds Available"
          value={bedsAvailable}
          onChange={(e) => setBedsAvailable(e.target.value)}
        />
        <input
          type="number"
          placeholder="Ventilators Available"
          value={ventilatorsAvailable}
          onChange={(e) => setVentilatorsAvailable(e.target.value)}
        />
        <input
          type="number"
          placeholder="ICU Capacity"
          value={ICUCapacity}
          onChange={(e) => setICUCapacity(e.target.value)}
        />
        <button type="submit">Update Hospital Resources</button>
      </form>
    </div>
  );
};

export default UpdateForm;
