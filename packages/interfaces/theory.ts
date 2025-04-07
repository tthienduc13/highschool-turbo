export type CreateTheoryPayload = {
  lessonId: string;
  theoryName: string;
  theoryDescription: string;
  theoryContent: string;
  theoryContentHtml: string;
};

export type Theory = {
  id: string;
  lessonId: string;
  theoryName: string;
  theoryDescription: string;
  theoryContentJson: string;
  theoryContentHtml: string;
};
