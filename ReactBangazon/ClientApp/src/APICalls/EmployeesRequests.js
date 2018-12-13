import axios from 'axios';

async function getRequest() {
    const response = await axios.get(`api/employees`) ;
    return await response.data;
}

async function postRequest(newEmployee) {
    const response = await axios.post('api/employees', newEmployee);
    return await response.data;
}

export default { getRequest, postRequest };
