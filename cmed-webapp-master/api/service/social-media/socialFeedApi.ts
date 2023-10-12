import { AxiosError } from 'axios';
import api from '../../config/api';
import { INewPost, SocialMediaPost } from '../../types/social-media/posts';

interface SocialFeedApiReturn {
  getPosts: () => Promise<SocialMediaPost[]>;
  createPost: (newPostData: INewPost) => Promise<any>;
  deletePost: (postId: string) => Promise<boolean>;
}

const socialFeedApi = (): SocialFeedApiReturn => {
  const getPosts = async (): Promise<SocialMediaPost[]> => {
    return await api
      .get('posts')
      .then((res) => res.data)
      .catch((error) => {
        return error.response.data as AxiosError;
      });
  };
  const createPost = async (newPostData: INewPost): Promise<any> => {
    return await api
      .post('posts', newPostData)
      .then((res) => res.data)
      .catch((error) => {
        return error.response.data as AxiosError;
      });
  };

  const deletePost = async (postId: string): Promise<boolean> => {
    return await api
      .delete(`posts/${postId}`)
      .then((res) => {
        return res.status === 200 || res.status === 204;
      })
      .catch(() => {
        return false;
      });
  };

  return { getPosts, createPost, deletePost };
};

export default socialFeedApi;
