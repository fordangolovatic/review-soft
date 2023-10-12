import api from './api';

const addArticles = (body) => {
  const articlesAdd = async () => api.post('v1/articles', body);
  return { articlesAdd };
};

export default addArticles;
