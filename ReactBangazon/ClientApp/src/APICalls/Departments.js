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

const deleteRequest = () => {
    return new Promise((resolve, reject) => {
        axios
            .get('https://localhost:44372/api/departments')
            .then()
    })
};

export default { getRequest, deleteRequest };
