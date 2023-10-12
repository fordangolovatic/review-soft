import api from './api';

const getArticles = () => {
    const articlesApi = async () => api.get('v1/articles');

    return { articlesApi };
};

export default getArticles;