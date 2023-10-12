import { useEffect, useState } from 'react';
import getAccountApi from '../api/getAccountApi';

const useAccount = () => {
  const accountState = [{
    accountId: '',
    firstName: '',
    lastName: '',
    accountTypeId: null,
    gender: '',
    address: '',
    cityId: '',
    postalCode: '',
    email: '',
    parentAccountId: null,
    isTranslator: null,
    isVerified: null,
    dateOfBirth: '',
    termsAndConditionAccepted: null,
    profileImage: null,
  }];

  const [account, setAccount] = useState(accountState);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const { accountsApi } = getAccountApi();

    accountsApi()
      .then((response) => {
        const res = response.data;
        setAccount(res);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoaded(true));
  }, []);

  return { account, error, loaded };
};

export default useAccount;
