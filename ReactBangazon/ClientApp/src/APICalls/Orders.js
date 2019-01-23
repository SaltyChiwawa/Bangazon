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

async function getSingleRequest(orderId) {
    const response = await axios.get(`/api/orders/${orderId}`);
    return await response.data;
}

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
            .catch((err) => {
                reject(err);
            });
    });
};

export default { getRequest, deleteRequest, updateRequest, getSingleCustomerRequest, addOrderLine, addOrderRequest, getSingleRequest };
