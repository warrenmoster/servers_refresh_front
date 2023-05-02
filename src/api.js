import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'

export const getServers = async () => {
    const url = API_URL + '/get_servers/';
    const response = await axios.get(url);
    return response.data.servers;
};

export const addServer = async (server) => {
    const url = API_URL + '/add_server/';
    const serverInfo = JSON.stringify(server);
    const response = await axios.post(url, serverInfo);
    return response.data;
};

export const deleteServer = async ( server_name ) => {
    const serverInfo = JSON.stringify({server_name: server_name});
    const url = API_URL + '/delete_server/'
    const response = await axios.delete(url, {data: serverInfo});
    return response.data;
}