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

const addProduct = (newProd) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`api/products`, newProd)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(console.error('Error in the addProducts request'), err);
            });
    });
};

export default { getAllProductsRequest, addProduct };