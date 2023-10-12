import api from '../../config/api';
import { City, Country, State } from '../../types/locations/location';

interface CountryApiReturn {
  getCountries: () => Promise<Country[]>;
  getStates: () => Promise<State[]>;
  getCities: () => Promise<City[]>;
}
const locationApi = (): CountryApiReturn => {
  const getCountries = async () => {
    const response: any = await api.get<{
      data: Country[];
    }>('country');
    return response.data;
  };
  const getStates = async () => {
    const response: any = await api.get<{
      data: State[];
    }>('state');
    return response.data;
  };
  const getCities = async () => {
    const response: any = await api.get<{
      data: City[];
    }>('city');
    return response.data;
  };

  return { getCountries, getCities, getStates };
};
export default locationApi;
