export interface SocialMediaPost {
  postId: string;
  content: string;
  created_date: Date;
}

export interface INewPost {
  content: string;
}

export interface IReturnNewPost {
  postId: string;
  content: string;
  user: number;
}
