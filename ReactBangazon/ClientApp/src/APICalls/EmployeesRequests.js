import axios from 'axios';

async function getRequest() {
    const response = await axios.get(`api/employees`) ;
    return await response.data;
}

export default { getRequest };
