import axios from 'axios';

const getAllPaymentTypes = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`api/paymentTypes`)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

const deletePaymentType = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`api/paymentTypes/${id}`)
            .then(res => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const postNewPaymentType = (newPaymentType) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`api/paymentTypes/paymenttype`, newPaymentType)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

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

export default { getAllPaymentTypes, deletePaymentType, updatePaymentType, postNewPaymentType };
