import axios from 'axios';

const getAllPaymentTypes = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`api/paymentTypes/paymnetTypes`)
            .then(res => {
                const paymentTypes = [];
                if (res.data !== null) {
                    Object.keys(res.data).forEach(pKey => {
                        res.data[pKey].id = pKey;
                        paymentTypes.push(res.data[pKey]);
                    });
                }
                resolve(paymentTypes);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export default { getAllPaymentTypes };
