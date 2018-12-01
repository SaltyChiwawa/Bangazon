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
            .then((res) =>
            {
                resolve(res);
            })
            .catch((err) =>
            {
                reject(err);
            })
    })
};

export default { getRequest, deleteRequest };