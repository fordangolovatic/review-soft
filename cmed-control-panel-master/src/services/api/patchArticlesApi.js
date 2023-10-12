import api from './api';

const updateArticles = (id, body) => {
    const articlesUpdate = async () => api.patch(`v1/articles/${id}`, body);
    return { articlesUpdate };
};

export default updateArticles;