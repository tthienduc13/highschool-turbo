export interface Lesson {
  id: string;
  lessonName: string;
  chapterId: string;
  slug: string;
  like: number;
  videoUrl: string;
  createdAt: Date;
  theoryCount: number;
  displayOrder: number;
  isDone: boolean;
  isCurrentView: boolean;
}

export interface LessonDetail {
  id: string;
  lessonName: string;
  lessonMaterial: string;
  slug: string;
  like: null;
  videoUrl: string;
  chapterId: string;
  theoryCount: number;
  createdAt: Date;
  theories: any[];
  displayOrder: number;
}
