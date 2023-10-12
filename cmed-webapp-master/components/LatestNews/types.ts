export interface INewsCardProps {
  article: {
    id: number;
    img: string;
    category: string;
    icon: JSX.Element;
    title: string;
    author: string;
    timestamp: {
      created: string;
      updated: string;
    };
  };
}
