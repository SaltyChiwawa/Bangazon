import axios from 'axios';

const getAllComputersRequest = () => {
    return new Promise((resolve, reject) => {
        axios 
            .get('https://localhost:51080/api/computers')
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export default { getAllComputersRequest };