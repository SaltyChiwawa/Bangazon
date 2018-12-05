import axios from 'axios';

const getAllProductsRequest = () => {
    return new Promise((resolve, reject) => {
        axios
            .get('api/products')
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export default { getAllProductsRequest };