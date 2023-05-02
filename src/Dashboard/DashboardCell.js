import React from 'react';
import './DashboardCell.css';

function DashboardCell( { server_name, setSelectedServers, selectedServers,  }) {

    const handleClick = () => {
        const newSelectedServers = selectedServers.filter((server) => server !== server_name);
        console.log(selectedServers)
        setSelectedServers(newSelectedServers);
    }

    return (
        <div className='dashboard-cell'>
            <div className='cellHeader'>
                <h1>{server_name}</h1>
                <select>
                    <option value="qps">Queries Per Second</option>
                    <option value="servfail">Servail Percentages</option>
                    <option value="cached">Cached Responses</option>
                </select>
                <button className='close-button' onClick={handleClick}>X</button>
            </div>
            <img src={process.env.PUBLIC_URL + '/test_graph.png'} alt="test image" />
        </div>
    )

}
export default DashboardCell