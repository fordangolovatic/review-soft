import api from './api';

const getRole = () => {
    const rolesApi = async () => api.get('/v1/role');

    return { rolesApi };
};

export default getRole;
