export interface News {
  id: string;
  author?: NewsAuthor;
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

export interface StudyGuide {
  id: string;
  newName: string;
  slug: string;
  author: NewsAuthor;
}

export type Tag = {
  id: string;
  newTagName: string;
  createdAt: string;
  createdBy: string;
};

export type TagPreview = {
  newsTagId: string;
  newsTagName: string;
};

export type NewsCreate = {
  newsTagId: string;
  newName: string;
  content: string;
  contentHtml: string;
  image: string;
  location: string;
};

export type NewsStatistic = {
  totalNews: number;
  thisMonthNews: number;
  increaseNewsPercent: number;
  totalHotNews: number;
  totalDeletedNews: number;
};
