import { useEffect, useState } from 'react';
import getRoleApi from '../api/getRoleApi';

const useRoles = () => {
    const roleState = [{
        'accountTypeId': '',
        'createdBy': null,
        'createdDate': '',
        'isDefault': null,
        'isForSignup': null,
        'isSystem': null,
        'modifiedBy': null,
        'modifiedDate': null,
        'roleId': '',
        'roleName': ''
    }]


    const [roles, setRoles] = useState(roleState);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const { rolesApi } = getRoleApi();

        rolesApi()
            .then((response) => {
                const res = response.data;
                setRoles(res);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoaded(true));
    }, []);

    return { roles, error, loaded };
};

export default useRoles;
