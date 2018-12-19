import axios from 'axios';

const getRequest = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`api/orders/fullorder`)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

const deleteRequest = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        axios
            .delete(`api/orders/${id}`)
            .then(res =>
            {
                resolve(res.data);
            })
            .catch(err =>
            {
                reject(err);
            })
    })
};

const updateRequest = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`api/orders/${id}`)
            .then(res => {
                resolve(res.data);
            })
            .catch((err)=> {
                reject(err);
            })
    })
}


const updatePaymentType = (updatePaymentType) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`api/paymentTypes/paymentType`, updatePaymentType)
            .then(res => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
export default { getRequest, deleteRequest, updateRequest };