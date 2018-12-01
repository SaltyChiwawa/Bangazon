import axios from 'axios';

const getRequest = () => {
  return new Promise((resolve, reject) => {
    axios
        .get(`https://localhost:44372/api/departments`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

async function postRequest(newDepartment) {
    try {
        const response = await axios.post(`https://localhost:44372/api/departments`, newDepartment);
        await console.error("response from database", response);
        return await response.json;
    }
    catch (error) {
        await console.error(error);
    }
}

export default { getRequest, postRequest };
