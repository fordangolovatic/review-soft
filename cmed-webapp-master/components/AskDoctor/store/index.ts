import { create } from 'zustand';
import { Article } from '../types';

interface IAskDoctorStore {
  articles: Article[];
  createArticle: (data: Article) => void;
  getArticles: (data: Article[]) => void;
}

const useAskDoctorStore = create<IAskDoctorStore>((set) => ({
  articles: [],
  getArticles: (data) =>
    set((state) => ({
      articles: (state.articles = [...data]),
    })),
  createArticle: (data) =>
    set((state) => ({
      articles: (state.articles = [...state.articles, data]),
    })),
}));

export default useAskDoctorStore;
