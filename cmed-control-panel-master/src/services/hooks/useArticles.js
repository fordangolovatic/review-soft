import { useEffect, useState } from 'react';
import deleteArticlesApi from '../api/deleteArticlesApi';
import getArticlesApi from '../api/getArticlesApi';
import updateArticlesApi from '../api/patchArticlesApi';
import addArticlesApi from '../api/postArticlesApi';

// eslint-disable-next-line import/prefer-default-export
export const useArticles = () => {
  const articlesState = [
    {
      articleId: '',
      content: '',
      type: '',
      createdAt: '',
      categories: [],
    },
  ];

  const [articles, setArticles] = useState(articlesState);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const { articlesApi } = getArticlesApi();

    articlesApi()
      .then((response) => {
        const res = response.data;

        setArticles(res);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoaded(true));
  }, []);

  const deleteArticle = async (articleId) => {
    try {
      const { articlesDeleteApi } = deleteArticlesApi(articleId);
      await articlesDeleteApi(articleId);
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.articleId !== articleId),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const updateArticle = async (articleId, content, type, image) => {
    try {
      const { articlesUpdate } = updateArticlesApi(articleId, { content, type, image });
      const response = await articlesUpdate();
      const updatedArticle = response.data;

      setArticles((prevArticles) =>
        prevArticles.map((article) => {
          if (article.articleId === updatedArticle.articleId) {
            return updatedArticle;
          }
          return article;
        }),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const addArticle = async (content, type, categories, image) => {
    try {
      const { articlesAdd } = addArticlesApi({ content, type, categories, image });
      const response = await articlesAdd({ content, type, categories, image });
      const newArticle = response.data;
      setArticles((prevArticles) => [...(prevArticles || []), newArticle]);
    } catch (err) {
      setError(err.message);
    }
  };

  return { articles, error, loaded, deleteArticle, updateArticle, addArticle };
};
