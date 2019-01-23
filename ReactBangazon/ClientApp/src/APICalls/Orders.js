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


const getOrderedRequest = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`api/orders/orderedProduct`)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};


const getSingleCustomerRequest = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`api/orders/customer/${id}`)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};


const addOrderLine = (newOrderLine) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`api/orderlines`, newOrderLine)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(console.error('Error in the add OrderLine request'), err);
            });
    });
};

const addOrderRequest = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`api/orders/${id}/new`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(console.error('Error in the add Order request'), err);
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

export default { getRequest, deleteRequest, updateRequest, getSingleCustomerRequest, addOrderLine, addOrderRequest, getOrderedRequest, updatePaymentType };
