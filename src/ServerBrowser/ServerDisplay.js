import React, { useState, useEffect } from 'react';
import { getServers } from '../api';
import './ServerBrowser.css';

function ServerDisplay({ toggle, sendToDashboard, selectedServers, deleteServer, setMasterServer}) {
  const [servers, setServers] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [refreshToggle, setRefreshToggle] = useState(false);


  useEffect(() => {
    const updateServers = () => {
      getServers()
      .then((data) => setServers(data))
      .catch((error) => console.log(error))
    };
    updateServers()
    const intervalId = setInterval(updateServers, 30000);
    return () => clearInterval(intervalId)
  }, [refreshToggle]); // added numServers as a dependency

  function handleExpand(index) {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  }

  function handleEdit(server) {
    setMasterServer(server)
    server.password = "*********";
    toggle()
  }

  function handleToggle() { 
    setMasterServer(null);
    toggle();
  }

  const handleDelete = (server_name) => {
    deleteServer(server_name);
    setRefreshToggle(!refreshToggle);
  }

  const handleSend = (server_name) => sendToDashboard([...selectedServers, server_name]);

  return (
    <div>
      <table className='server-table'>
        <tbody>
          {servers.map((server, index) => (
            <tr>
              <td onDoubleClick={() => handleEdit(server)} onClick={() => handleExpand(index)}>{server.server_name}</td>
              {expanded[index] && (
                <div>
                  <div className='server-info'>
                    <p>IP Address: {server.ip_address}</p>
                    {server.location ? (<p>Location: {server.location}</p>) : (<></>)}
                  </div>
                  <table className='subtable'>
                    <tr>
                      <td className={server.health_monitored ? 'green-cell' : 'red-cell'}>Health Monitored</td>
                      <td className={server.is_monitored ? 'green-cell' : 'red-cell'}>Stats Monitored</td>
                    </tr>
                  </table>
                  <div className='server-buttons'>
                    <button onClick={ () => handleSend(server.server_name) }>Send to Dashboard</button>
                    <button onClick={ () => handleDelete(server.server_name) }>Delete Server</button>
                  </div>
                </div>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleToggle}>Add Server</button>
    </div>
  )
}

export default ServerDisplay;