import axios from 'axios';

const getRequest = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`api/orders`)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export default { getRequest };