import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import ServerDisplay from './ServerBrowser/ServerDisplay';
import AddServerForm from './ServerBrowser/AddServerForm';
import Header from './Header.js';
import DashboardCell from './Dashboard/DashboardCell.js';
import { addServer, deleteServer } from './api';
import './index.css'


function Body() {
  const [showAddServer, setShowAddServer] = useState(false);
  const [server, setServer] = useState(null);
  const [selectedServers, setSelectedServers] = useState([]);
  const toggle = () =>
    setShowAddServer(!showAddServer);

  return (
    <div>
      <div className='sidebar'>
        {showAddServer ? (
          <AddServerForm server={server} onSubmit={addServer} toggle={toggle} setMasterServer={setServer} />
        ) : (
          <ServerDisplay toggle={toggle} deleteServer={deleteServer}
            setMasterServer={setServer} sendToDashboard={setSelectedServers}
            selectedServers={selectedServers} />
        )}
      </div>
      <div className='dashboard-container'>
        <div className='dashboard-cells'>
          {selectedServers.map((dash_server) => {
            return (
              <DashboardCell server_name={dash_server}
                setSelectedServers={setSelectedServers} selectedServers={selectedServers} />
            );
          })
          }
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='application'>
    <head className='header'>
      <Header />
    </head>
    <body>
      <Body />
    </body>
  </div>

);