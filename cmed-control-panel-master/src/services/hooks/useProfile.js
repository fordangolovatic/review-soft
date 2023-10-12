import { useEffect, useState } from 'react';
import getProfileApi from '../api/getProfileApi';

const useProfile = () => {
  const profile = {
    firstName:'',
    lastName:'',
    email:'',
    accountId:'',
    accountTypeId:'',
  }

  const [data, setData] = useState(profile);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const { profileApi } = getProfileApi();

    profileApi()
      .then((response) => {
        const res = response.data
        setData( res );
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoaded(true));
  }, []);

  return { data, error, loaded };


};

export default useProfile;
