import React, { useState, useEffect } from 'react';
import { isNameValid, getLocations } from '../mock-api/apis';

const Form = () => {
  const [name, setName] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isNameTaken, setIsNameTaken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState([]);

  // Fetch locations from the API and set them in state
  useEffect(() => {
    getLocations()
      .then(setLocations)
      .catch(console.error) // Handle errors as appropriate for your app
      .finally(() => setIsLoading(false));
  }, []);

  // Validate name whenever it changes
  useEffect(() => {
    const validateName = async () => {
      setIsLoading(false);
      const isValid = await isNameValid(name);
      setIsNameTaken(!isValid);
      setIsLoading(false);
    };

    if (name) {
      validateName();
    } else {
      setIsNameTaken(true);
    }
  }, [name]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleAdd = () => {
    // Add the name and location to the entries array if the name is valid
    if (name && !isNameTaken && selectedLocation) {
      setEntries([...entries, { name, location: selectedLocation }]);
      setName(''); // Clear the name field
      setSelectedLocation(''); // Clear the location field
    }
  };

  const handleClear = () => {
    setName('');
    setSelectedLocation('');
  };

  return (
    <div className="container">
        <div className='row'>
            <div className='col-sm-0 col-md-2 col-lg-4'></div>
            <div className='col-sm-0 col-md-8 col-lg-4'>
                <div className='card mt-5'>
                    <div className='card-header'>
                        <h3>Form</h3>
                    </div>
                    <div className='card-body'>
                    <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className={isNameTaken ? 'error' : ''}
                placeholder="Enter name"
                autoComplete="off"
                disabled={isLoading}
                />
                {isNameTaken && <p className="error-message">This name has already been taken</p>}
            </div>
            <div className="input-group">
                <label htmlFor="location">Location</label>
                <select
                id="location"
                value={selectedLocation}
                onChange={handleLocationChange}
                disabled={isLoading}
                >
                <option value="">Select location</option>
                {locations.map((location) => (
                    <option key={location} value={location}>
                    {location}
                    </option>
                ))}
                </select>
            </div>
            <div className="form-actions">
                <button type="button" onClick={handleClear}>Clear</button>
                <button type="button" onClick={handleAdd} disabled={isNameTaken || isLoading}>Add</button>
            </div>
                    </div>
                </div>
            </div>
            <div className='col-sm-0 col-md-2 col-lg-4'></div>
        </div>
        <div className='row'>
            <div className='col-sm-0 col-md-2 col-lg-4'></div>
            <div className='col-sm-0 col-md-8 col-lg-4'>
            <table className='table table-striped'>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                </tr>
                </thead>
                <tbody>
                {entries.map((entry, index) => (
                    <tr key={index}>
                    <td>{entry.name}</td>
                    <td>{entry.location}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            <div className='col-sm-0 col-md-2 col-lg-4'></div>
        </div>
    </div>
  );
};

export default Form;
