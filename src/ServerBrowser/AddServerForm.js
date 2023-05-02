import { useState } from 'react';
import "./ServerBrowser.css"

function AddServerForm({ onSubmit, toggle, server }) {
  const [serverData, setServerData] = useState(
    server ? server : {
      ip_address: '',
      server_name: '',
      location: '',
      password: '',
      health_monitored: false,
      is_monitored: false,
      passwordless: false,
    });

  
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(serverData).then(toggle());
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setServerData(prevServerData => ({
      ...prevServerData,
      [name]: value,
    }));
  }

  function handleRadioChange(event) {
    const { name, value } = event.target;
    const newValue = value === 'yes' ? true : false;
    console.log("NEWVALUE + " + newValue)
    setServerData({ ...serverData, [name]: newValue });
  }

  return (
    <form className="add-server-form" onSubmit={handleSubmit}>
      <div className='grid-container'>
        <div className='text-inputs'>
          <div>
            <label for="name">Name</label>
            <input
              id="server_name"
              type="text"
              name="server_name"
              value={serverData.server_name}
              onChange={handleInputChange}
            />
          </div>
          <div>

            <label for="ip_address">IP Address</label>
            <input
              id="ip_address"
              type="text"
              name="ip_address"
              value={serverData.ip_address}
              onChange={handleInputChange}
            />
          </div>
          <div>

            <label for="location">Location</label>
            <input
              id="location"
              type="text"
              name="location"
              value={serverData.location}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={serverData.password}
              onChange={handleInputChange}
              disabled={serverData.passwordless}
            />
          </div>
        </div>
        <div className='radio-group'>
          <label>
            Perform Health Monitoring
            <div className='button-group'>
              Yes
              <input
                type="radio"
                name="health_monitored"
                value="yes"
                checked={serverData.health_monitored}
                onChange={handleRadioChange}
              />
              No
              <input
                type="radio"
                name="health_monitored"
                value="no"
                checked={!serverData.health_monitored}
                onChange={handleRadioChange}
              />
            </div>
          </label>
          <br />
          <label>
            Perform Stats Monitoring
            <div className='button-group'>
              Yes
              <input
                type="radio"
                name="is_monitored"
                value="yes"
                checked={serverData.is_monitored}
                onChange={handleRadioChange}
              />
              No
              <input
                type="radio"
                name="is_monitored"
                value="no"
                checked={!serverData.is_monitored}
                onChange={handleRadioChange}
              />
            </div>
          </label>
          <br />
          <label>
            Passwordless Login
            <div className='button-group'>
              Yes
              <input
                type="radio"
                name="passwordless"
                value="yes"
                checked={serverData.passwordless}
                onChange={handleRadioChange}
              />
              No
              <input
                type="radio"
                name="passwordless"
                value="no"
                checked={!serverData.passwordless}
                onChange={handleRadioChange}
              />
            </div>
          </label>
        </div>
        <button type="submit">Add Server</button>
        <button type='cancel' onClick={toggle}>Cancel</button>
      </div>
    </form>
  );
}


export default AddServerForm