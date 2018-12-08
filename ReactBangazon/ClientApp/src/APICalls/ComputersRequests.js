import axios from 'axios';

const getAllComputersRequest = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`api/computers`)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

const addComputer = (newComp) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`api/computers`, newComp)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.error('Error in the addComputer request', err);
            });
    });
};

const deleteComputer = (id) => {
    return new Promise((resolve, reject) => {
        axios   
            .delete(`api/computers/`+ id)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

export default { getAllComputersRequest, addComputer, deleteComputer };