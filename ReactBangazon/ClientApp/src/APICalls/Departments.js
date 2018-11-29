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

export default { getRequest };
