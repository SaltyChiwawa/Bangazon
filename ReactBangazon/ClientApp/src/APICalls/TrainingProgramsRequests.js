import axios from 'axios';

async function getRequest() {
    const response = await axios.get('api/trainingprograms');
    return await response.data;
}

export default { getRequest };
