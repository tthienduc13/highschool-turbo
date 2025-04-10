// Base service prefixes
const SERVICE_PREFIXES = {
  USER: "/users-service",
  DOCUMENT: "/documents-service",
  GAME: "/game-service",
  MEDIA: "/media-service",
  ANALYSE: "/analyse-service",
  ACADEMIC_HUB: "/academic-hub-service",
} as const;

// API version prefixes
const API_VERSIONS = {
  V1: "/api/v1",
  V2: "/api/v2",
} as const;

// Utility function to construct endpoint paths
const createEndpoint = (
  service: string,
  version: string,
  path: string,
): string => `${service}${version}${path}`;

export const aIFlashcardEndpoint = {
  create: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/beta/ai-flashcard",
  ),
} as const;

// Authentication Endpoints
export const authEndpoints = {
  google: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V2,
    "/authentication/google",
  ),
  magicLink: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V2,
    "/authentication/login",
  ),
  credentials: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/authentication/login",
  ),
  verifyAccount: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V2,
    "/authentication/verify-account",
  ),
  refreshToken: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V2,
    "/authentication/refresh-token",
  ),
} as const;

// Information Endpoints
export const informationEndpoints = {
  getAllSchools: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/information/schools",
  ),
  getCitySchools: (cityId: number) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/information/provice/${cityId}/schools`,
    ),
  getAllCities: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/information/provinces",
  ),
  createSchools: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/information/province/schools",
  ),
  getSchools: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/information/schools",
  ),
  getAllProvinceSchool: (provinceId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/information/provice/${provinceId}/schools`,
    ),
  createProvinces: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/information/provinces",
  ),
  getProvinces: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/information/provinces",
  ),
} as const;

// User Endpoints
export const userEndpoints = {
  getAuthor: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/users/author",
  ),
  getAuthorById: (authorId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.USER,
      API_VERSIONS.V1,
      `/users/author/${authorId}`,
    ),
  checkUsername: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/users/checkusername",
  ),
  updateBaseUser: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/users/baseuser",
  ),
  completeOnboard: (userId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.USER,
      API_VERSIONS.V1,
      `/users/newuser/${userId}`,
    ),
  getProfile: (username: string) =>
    createEndpoint(
      SERVICE_PREFIXES.USER,
      API_VERSIONS.V1,
      `/users/infor/${username}`,
    ),
  getUserFlashcards: (username: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/flashcard/user/${username}`,
    ),
  getOwnerFlashcards: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/flashcard/user",
  ),
  getOrientationStatus: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/users/personalityTestStatus",
  ),
  getProgressState: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/users/progressStage",
  ),
  cachePersonality: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/users/cachePersonality",
  ),
  report: createEndpoint(SERVICE_PREFIXES.USER, API_VERSIONS.V1, "/reports"),
  getUser: createEndpoint(SERVICE_PREFIXES.USER, API_VERSIONS.V1, "/users"),
  updateStatus: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/users/status",
  ),
  getUserDetail: (userId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.USER,
      API_VERSIONS.V1,
      `/users/infor/${userId}`,
    ),
  updateUser: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/users/baseuser",
  ),
  createUser: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/users/createaccount",
  ),
  updateStatusUser: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/users/status",
  ),
  getStatisticUser: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/users/statistic",
  ),
  getTeacherExperience: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/users/teacherExperience",
  ),
  getUserGrowth: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/users/userGrowth",
  ),
  getUserActivities: createEndpoint(
    SERVICE_PREFIXES.ANALYSE,
    API_VERSIONS.V1,
    "/userActivity",
  ),
  getUserRetention: createEndpoint(
    SERVICE_PREFIXES.ANALYSE,
    API_VERSIONS.V1,
    "/userRetention",
  ),
} as const;

// Media Endpoints
export const mediaEndpoints = {
  uploadImage: createEndpoint(
    SERVICE_PREFIXES.MEDIA,
    API_VERSIONS.V1,
    "/upload/image",
  ),
  getDocument: (documentId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.MEDIA,
      API_VERSIONS.V1,
      `/document/${documentId}`,
    ),
  uploadDocument: (documentId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.MEDIA,
      API_VERSIONS.V1,
      `/document/${documentId}`,
    ),
  downloadDocument: (documentId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.MEDIA,
      API_VERSIONS.V1,
      `/document/download/${documentId}`,
    ),
  getHotNews: createEndpoint(
    SERVICE_PREFIXES.MEDIA,
    API_VERSIONS.V1,
    "/hotnews",
  ),
  getPopularNews: createEndpoint(
    SERVICE_PREFIXES.MEDIA,
    API_VERSIONS.V1,
    "/popularnews",
  ),
  getNews: createEndpoint(SERVICE_PREFIXES.MEDIA, API_VERSIONS.V1, "/news"),
  getNewsBySlug: (slug: string) =>
    createEndpoint(
      SERVICE_PREFIXES.MEDIA,
      API_VERSIONS.V1,
      `/new/slug/${slug}`,
    ),
  getNewsByAuthor: (authorId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.MEDIA,
      API_VERSIONS.V1,
      `/new/authorId/${authorId}`,
    ),
  getRelatedNews: (newTagId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.MEDIA,
      API_VERSIONS.V1,
      `/relatednews/${newTagId}`,
    ),
} as const;

// Document Endpoints
export const documentEndpoints = {
  getAllSchools: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/information/schools",
  ),
  getCitySchools: (cityId: number) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/information/provice/${cityId}/schools`,
    ),
  getAllCities: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/information/provinces",
  ),
  getDocuments: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/documents/advance",
  ),
  getDocumentBySlug: (slug: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/document/slug/${slug}`,
    ),
  getRecommendedData: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/data/recommended",
  ),
  getAllCategories: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/categories",
  ),
  DELETE: (id: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/document/${id}`,
    ),
} as const;

// Folder Endpoints
export const folderEndpoints = {
  create: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/folders",
  ),
  getUserFolders: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/folders",
  ),
  getFolderDetail: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/folders/flashcards",
  ),
  addToFolder: (folderId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/folders/${folderId}/add`,
    ),
  update: (folderId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/folders/${folderId}`,
    ),
  delete: (folderId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/folders/${folderId}`,
    ),
  removeFlashcard: (flashcardId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/folders/flashcards/${flashcardId}`,
    ),
  removeDocument: (documentId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/folders/documents/${documentId}`,
    ),
} as const;

// User Personalized Endpoints
export const userPersonalizedEndpoints = {
  recentView: createEndpoint(
    SERVICE_PREFIXES.ANALYSE,
    API_VERSIONS.V1,
    "/recent-view",
  ),
  getRecommended: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/data/recommended",
  ),
} as const;

// Flashcard Endpoints
export const flashcardEndpoints = {
  getTop: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/flashcard/top",
  ),
  draft: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/flashcard/draft",
  ),
  related: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/flashcard/related",
  ),
  getBySlug: (slug: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/flashcard/slug/${slug}`,
    ),
  getById: (id: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/flashcard/${id}`,
    ),
  createFromDraft: (id: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/flashcard/created/${id}`,
    ),
  editSet: (id: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/flashcard/${id}`,
    ),
  delete: (flashcardId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/flashcard/${flashcardId}`,
    ),
  starTerm: (flashcardContentId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/starredTerm/${flashcardContentId}`,
    ),
  updateContainer: (flashcardId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/container/flashcard/${flashcardId}`,
    ),
  getFlashcards: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/flashcard/management",
  ),
  createFlashcard: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/flashcard",
  ),
  getDraftById: (id: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/flashcard/draft/${id}`,
    ),
} as const;

// Flashcard Content Endpoints
export const flashcardContentEndpoints = {
  getListBySlug: (slug: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/flashcard/slug/${slug}/contents`,
    ),
  getListById: (id: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/flashcard/${id}/contents`,
    ),
  editContent: (flashcardId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/flashcard/${flashcardId}/content`,
    ),
  createContent: (flashcardId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/flashcard/${flashcardId}/content`,
    ),
  createContents: (flashcardId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/flashcard/${flashcardId}/contents`,
    ),
  updateContentsById: (flashcardId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/flashcard/${flashcardId}/contents`,
    ),
  reorderTerm: (flashcardContentId: string, newRank: number) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/flashcard/content/${flashcardContentId}/rank/${newRank}`,
    ),
  delete: ({
    flashcardId,
    flashcardContentId,
  }: {
    flashcardId: string;
    flashcardContentId: string;
  }) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/flashcard/${flashcardId}/contents/${flashcardContentId}`,
    ),
} as const;

export const flashcardStudyEndpoints = {
  getFSRSById: (id: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/feature/flashcard/${id}/learn`,
    ),
  getFSRSBySlug: (slug: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/feature/flashcard/${slug}/learn-slug`,
    ),
  updateProgress: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/feature/flashcard/progress",
  ),
};

export const subjectCurriculumEndpoints = {
  checkIsPublished: ({
    subjectId,
    curriculumId,
  }: {
    subjectId: string;
    curriculumId: string;
  }) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/check/subject/${subjectId}/curriculum/${curriculumId}`,
    ),
  publishCourse: ({
    subjectId,
    curriculumId,
  }: {
    subjectId: string;
    curriculumId: string;
  }) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V2,
      `/subject/${subjectId}/curriculum/${curriculumId}/publish`,
    ),
  unpublishCourse: ({
    subjectId,
    curriculumId,
  }: {
    subjectId: string;
    curriculumId: string;
  }) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V2,
      `/subject/${subjectId}/curriculum/${curriculumId}/unpublish`,
    ),
};

export const masterCourseEndpoints = {
  getMasterCourse: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/master-subjects",
  ),
  create: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/master-subject",
  ),
  edit: (id: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/master-subject/${id}`,
    ),
  delete: (id: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/master-subject/${id}`,
    ),
};

// Course Endpoints
export const courseEndpoints = {
  create: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/subject",
  ),
  createWithAuto: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V2,
    "/subject",
  ),
  edit: createEndpoint(SERVICE_PREFIXES.DOCUMENT, API_VERSIONS.V1, "/subject"),
  getCourses: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/subjects",
  ),
  getBySlug: (slug: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/subject/slug/${slug}`,
    ),
  getById: (id: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/subject/${id}`,
    ),
  enroll: ({
    subjectId,
    curriculumId,
  }: {
    subjectId: string;
    curriculumId: string;
  }) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/enroll?subjectId=${subjectId}&curriculumId=${curriculumId}`,
    ),
  unenroll: ({
    subjectId,
    curriculumId,
  }: {
    subjectId: string;
    curriculumId: string;
  }) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/unenroll?subjectId=${subjectId}&curriculumId=${curriculumId}`,
    ),
} as const;

// MBTI Endpoints
export const mbtiEndpoints = {
  getTest: createEndpoint(SERVICE_PREFIXES.USER, API_VERSIONS.V1, "/mbti"),
  submit: createEndpoint(SERVICE_PREFIXES.USER, API_VERSIONS.V1, "/mbti"),
  updateStudentMbti: (mbtiType: string) =>
    createEndpoint(
      SERVICE_PREFIXES.USER,
      API_VERSIONS.V1,
      `/users/student/mbti/${mbtiType}`,
    ),
} as const;

// Holland Endpoints
export const hollandEndpoints = {
  getTest: createEndpoint(SERVICE_PREFIXES.USER, API_VERSIONS.V1, "/holland"),
  getStudentHolland: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/users/student/hollandType",
  ),
  submit: createEndpoint(SERVICE_PREFIXES.USER, API_VERSIONS.V1, "/holland"),
  updateStudentHolland: (hollandType: string) =>
    createEndpoint(
      SERVICE_PREFIXES.USER,
      API_VERSIONS.V1,
      `/users/student/holland/${hollandType}`,
    ),
} as const;

// Flashcard Learn Endpoints
export const flashcardLearnEndpoints = {
  postProgress: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/feature/flashcard/progress",
  ),
  getLearnSet: (flashcardId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/feature/flashcard/${flashcardId}/study`,
    ),
  getLearnProgress: (flashcardId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/feature/flashcard/${flashcardId}/progress`,
    ),
  resetProgress: (flashcardId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/feature/flashcard/${flashcardId}/reset-progress`,
    ),
} as const;

// Chapter Endpoints
export const chapterEndpoints = {
  getChapters: (courseSlug: string, curriculumId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/chapter/subject/slug/${courseSlug}/curriculum/${curriculumId}`,
    ),
  getListById: (courseId: string, curriculumId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/chapter/subject/${courseId}/curriculum/${curriculumId}`,
    ),
  createChapter: (courseId: string, curriculumId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V2,
      `/chapter/subject/${courseId}/curriculum/${curriculumId}`,
    ),
  editChapter: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    `/chapter`,
  ),
  deleteChapter: (chapterId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/chapter/${chapterId}`,
    ),
} as const;

// Lesson Endpoints
export const lessonEndpoints = {
  createLesson: (chapterId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/chapter/${chapterId}/lesson`,
    ),
  editLesson: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    `/lesson`,
  ),
  deleteLessons: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    `/lessons`,
  ),
  getLessons: (chapterId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/chapter/${chapterId}/lessons`,
    ),
  getLessonDetail: (lessonId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/chapter/lesson/${lessonId}`,
    ),
  finishLesson: (lessonId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/enrollProgress/${lessonId}`,
    ),
} as const;

// Career Guidance Endpoints
export const careerGuidanceEndpoints = {
  getBrief: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/users/brief?isHardCode=true",
  ),
  getRecommendMajor: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/users/recommendMajor",
  ),
} as const;

// Roadmap Endpoints
export const roadmapEndpoints = {
  getUserRoadmap: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/users/roadmap",
  ),
  getNodeResource: (resourceId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/roadmap/node/data/${resourceId}`,
    ),
  relatedSubjectsByIds: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/subject/related/ids",
  ),
  relatedDocumentsByIds: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/document/related/ids",
  ),
} as const;

// Search Endpoints
export const searchEndpoints = {
  search: createEndpoint(SERVICE_PREFIXES.ANALYSE, API_VERSIONS.V1, "/search"),
  searchEntity: createEndpoint(
    SERVICE_PREFIXES.ANALYSE,
    API_VERSIONS.V1,
    "/search/courses",
  ),
} as const;

export const userAnalyticEndpoints = {
  ownedStatistic: createEndpoint(
    SERVICE_PREFIXES.ANALYSE,
    API_VERSIONS.V1,
    "/ownedStatistic",
  ),
};

// Quiz Endpoints
export const quizEndpoints = {
  getQuiz: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/questions/quiz",
  ),
  submitQuiz: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/questions/quiz/submit",
  ),
} as const;

// University Endpoints
export const universityEndpoints = {
  getList: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/university",
  ),
  getUniversityName: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/university/name",
  ),
  create: createEndpoint(SERVICE_PREFIXES.USER, API_VERSIONS.V1, "/university"),
  getUniversityDetail: (universityId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.USER,
      API_VERSIONS.V1,
      `/university/${universityId}`,
    ),
  updateUniversity: (universityId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.USER,
      API_VERSIONS.V1,
      `/university/${universityId}`,
    ),
  deleteUniversity: (universityId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.USER,
      API_VERSIONS.V1,
      `/university/${universityId}`,
    ),
  getUniversityMajor: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/universityMajor",
  ),
  getUniversityMajorName: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/universityMajor/name",
  ),
  createUniversityMajor: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/universityMajor",
  ),
  updateUniversityMajor: (universityMajorId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.USER,
      API_VERSIONS.V1,
      `/universityMajor/${universityMajorId}`,
    ),
  deleteUniversityMajor: (universityMajorId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.USER,
      API_VERSIONS.V1,
      `/universityMajor/${universityMajorId}`,
    ),
} as const;

// KET Endpoints
export const ketEndpoints = {
  getKets: "/kets", // Note: No service prefix provided in original
  getKetCategories: "/kets/categories", // Note: No service prefix provided in original
} as const;

// Occupation Endpoints
export const occupationEndpoints = {
  getOccupations: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/occupation",
  ),
  create: createEndpoint(SERVICE_PREFIXES.USER, API_VERSIONS.V1, "/occupation"),
  update: (occupationId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.USER,
      API_VERSIONS.V1,
      `/occupation/${occupationId}`,
    ),
  delete: (occupationId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.USER,
      API_VERSIONS.V1,
      `/occupation/${occupationId}`,
    ),
} as const;

// Major Endpoints
export const majorEndpoints = {
  getMajor: createEndpoint(SERVICE_PREFIXES.USER, API_VERSIONS.V1, "/major"),
  getMajorName: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/major/name",
  ),
  create: createEndpoint(SERVICE_PREFIXES.USER, API_VERSIONS.V1, "/major"),
  update: (majorId: string) =>
    createEndpoint(SERVICE_PREFIXES.USER, API_VERSIONS.V1, `/major/${majorId}`),
  delete: (majorId: string) =>
    createEndpoint(SERVICE_PREFIXES.USER, API_VERSIONS.V1, `/major/${majorId}`),
  getMajorCategory: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/majorCategory",
  ),
  getMajorCategoryName: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/majorCategory/name",
  ),
  createMajorCategory: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/majorCategory",
  ),
  updateMajorCategory: (majorCategoryId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.USER,
      API_VERSIONS.V1,
      `/majorCategory/${majorCategoryId}`,
    ),
  deleteMajorCategory: (majorCategoryId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.USER,
      API_VERSIONS.V1,
      `/majorCategory/${majorCategoryId}`,
    ),
} as const;

// Zone Endpoints
export const zoneEndpoints = {
  create: createEndpoint(
    SERVICE_PREFIXES.ACADEMIC_HUB,
    API_VERSIONS.V1,
    "/zones",
  ),
  getById: (zoneId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.ACADEMIC_HUB,
      API_VERSIONS.V1,
      `/zones/${zoneId}`,
    ),
} as const;

// News Endpoints
export const newsEndpoints = {
  getHotNews: createEndpoint(
    SERVICE_PREFIXES.MEDIA,
    API_VERSIONS.V1,
    "/hotnews",
  ),
  getPopularNews: createEndpoint(
    SERVICE_PREFIXES.MEDIA,
    API_VERSIONS.V1,
    "/popularnews",
  ),
  getNews: createEndpoint(SERVICE_PREFIXES.MEDIA, API_VERSIONS.V1, "/news"),
  getNewsBySlug: (slug: string) =>
    createEndpoint(
      SERVICE_PREFIXES.MEDIA,
      API_VERSIONS.V1,
      `/new/slug/${slug}`,
    ),
  getNewsByAuthor: (authorId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.MEDIA,
      API_VERSIONS.V1,
      `/new/authorId/${authorId}`,
    ),
  getRelatedNews: (newTagId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.MEDIA,
      API_VERSIONS.V1,
      `/relatednews/${newTagId}`,
    ),
  create: createEndpoint(SERVICE_PREFIXES.MEDIA, API_VERSIONS.V1, "/new"),
  getNewsDetail: (slug: string) =>
    createEndpoint(
      SERVICE_PREFIXES.MEDIA,
      API_VERSIONS.V1,
      `/new/slug/${slug}`,
    ),
  getStatistic: createEndpoint(
    SERVICE_PREFIXES.MEDIA,
    API_VERSIONS.V1,
    "/statistic/news",
  ),
} as const;

// Tag Endpoints
export const tagEndpoints = {
  getAll: createEndpoint(SERVICE_PREFIXES.MEDIA, API_VERSIONS.V1, "/newstags"),
  create: createEndpoint(SERVICE_PREFIXES.MEDIA, API_VERSIONS.V1, "/newstag"),
  getTagFlashcard: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/tags",
  ),
  createTagFlashcard: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/tags",
  ),
} as const;

// Game Endpoints
export const gameEndpoints = {
  checkRoom: createEndpoint(
    SERVICE_PREFIXES.GAME,
    API_VERSIONS.V1,
    "/games/check-room",
  ),
  joinRoom: createEndpoint(
    SERVICE_PREFIXES.GAME,
    API_VERSIONS.V1,
    "/games/join-room",
  ),
  createRoom: createEndpoint(
    SERVICE_PREFIXES.GAME,
    API_VERSIONS.V1,
    "/games/create-room",
  ),
} as const;

// Category Endpoints
export const categoryEndpoints = {
  getAll: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/categories",
  ),
} as const;

export const curriculumEndpoints = {
  get: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/curriculum",
  ),
  create: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/curriculum",
  ),
  delete: createEndpoint(
    SERVICE_PREFIXES.DOCUMENT,
    API_VERSIONS.V1,
    "/curriculum",
  ),
  edit: (curriculumId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V2,
      `/curriculum?id=${curriculumId}`,
    ),
} as const;

export const reportEndpoint = {
  get: createEndpoint(SERVICE_PREFIXES.USER, API_VERSIONS.V1, "/reports"),
  updateStatus: createEndpoint(
    SERVICE_PREFIXES.USER,
    API_VERSIONS.V1,
    "/reports",
  ),
} as const;

export const fsrsEndpoints = {
  get: createEndpoint(SERVICE_PREFIXES.DOCUMENT, API_VERSIONS.V1, "/preset"),
  create: createEndpoint(SERVICE_PREFIXES.DOCUMENT, API_VERSIONS.V1, "/preset"),
  update: (presetId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/preset/${presetId}`,
    ),
  delete: (presetId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/preset/${presetId}`,
    ),
} as const;

export const theoryEndpoint = {
  create: (lessonId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/theory/lesson/${lessonId}`,
    ),
  update: (theoryId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/theory/${theoryId}`,
    ),
  delete: (theoryId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/theory/${theoryId}`,
    ),
  getLessonTheories: (lessonId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/theory/lesson/${lessonId}`,
    ),
  getById: (theoryId: string) =>
    createEndpoint(
      SERVICE_PREFIXES.DOCUMENT,
      API_VERSIONS.V1,
      `/theory/${theoryId}`,
    ),
};
