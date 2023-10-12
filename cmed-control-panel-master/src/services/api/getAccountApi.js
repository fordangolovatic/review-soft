import api from './api';

const getAccountApi = () => {
    const accountsApi = async () => api.get('/v1/account');

    return { accountsApi };
};

export default getAccountApi;
