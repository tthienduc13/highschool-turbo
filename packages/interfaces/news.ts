export interface News {
  id: string;
  author: NewsAuthor;
  newName: string;
  content: string;
  contentHtml: string;
  image: string;
  slug: string;
  view: number;
  newsTagId: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  hot: boolean;
  isDeleted: boolean;
  location: string;
  newsTagName: string;
}

export type NewsAuthor = {
  authorId: string;
  authorImage: string;
  authorName: string;
};
