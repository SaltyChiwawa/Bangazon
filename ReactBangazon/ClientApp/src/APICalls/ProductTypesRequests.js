import axios from 'axios';

async function getRequest() {
    const response = await axios.get('api/producttypes');
    return await response.data;
}

export default { getRequest };
