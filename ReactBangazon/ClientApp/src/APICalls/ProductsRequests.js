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

const queryOnProducts = (q) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`api/products?q=${q}`)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

const getSingleProductsRequest = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`api/products/${id}`)
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

const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .delete('api/products/' + id)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const updateProduct = (newProd, prodId) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`api/products/${prodId}`, newProd)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};


export default { getAllProductsRequest, addProduct, deleteProduct, updateProduct, getSingleProductsRequest };

