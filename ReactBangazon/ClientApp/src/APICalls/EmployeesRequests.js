import axios from 'axios';

async function getRequest() {
    const response = await axios.get(`api/employees`);
    return await response.data;
}

async function deleteRequest(id) {
    const response = await axios.delete(`api/employees/${id}`);
    return await response.data;
}

export default { getRequest, deleteRequest };
