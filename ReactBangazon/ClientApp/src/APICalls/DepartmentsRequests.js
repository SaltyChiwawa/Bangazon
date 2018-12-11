import axios from 'axios';

const getRequest = () => {
  return new Promise((resolve, reject) => {
    axios
        .get(`api/departments`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

async function postRequest(newDepartment) {
    const response = await axios.post(`api/departments`, newDepartment);
    return await response.data;
 
}

async function deleteRequest(id) {
    const response = await axios.delete(`api/departments/${id}`);
    return await response.data;
}

async function putRequest(newDepartment, id) {
    const response = await axios.put(`api/departments/${id}`, newDepartment);
    return await response.data;
}

export default { getRequest, postRequest, deleteRequest, putRequest };
