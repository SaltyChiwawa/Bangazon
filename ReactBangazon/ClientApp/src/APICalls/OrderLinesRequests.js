import axios from 'axios';

// Gettin all orderline
async function getRequest() {
    const response = await axios.get('api/orderlines');
    return await response.data;
}

// Getting single orderline
//async function getSingleRequest(id) {
//    const response = await axios.get(`api/orderlines/${id}`);
//    return await response.data;
//}

const getSingleRequest = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`api/orderlines/${id}`)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

const deleteOrderLine = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`api/orderlines/${id}`)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export default { getRequest, getSingleRequest, deleteOrderLine };
