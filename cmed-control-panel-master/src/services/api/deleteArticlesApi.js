import api from './api';

const deleteArticles = (id) => {
    const articlesDeleteApi = async () => api.delete(`v1/articles/${id}`);

    return { articlesDeleteApi };
};

export default deleteArticles;