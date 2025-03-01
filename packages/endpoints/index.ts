const prefixUserServices = "/users-service";
const prefixDocumentServices = "/documents-service";
const prefixGameServices = "/game-service";
const prefixMediaServices = "/media-service";
const prefixAnalyseServices = "/analyse-service";

const prefixFirstVersion = "/api/v1";
const prefixSecondVerson = "/api/v2";

const endpointUploadImage = {
  UPLOAD_IMAGE: `${prefixMediaServices}${prefixFirstVersion}/upload/image`,
};

const endpointAuth = {
  GOOGLE: `${prefixUserServices}${prefixSecondVerson}/authentication/google`,
  MAGIC_LINK: `${prefixUserServices}${prefixSecondVerson}/authentication/login`,
  CREDENTIALS: `${prefixUserServices}${prefixFirstVersion}/authentication/login`,
  VERIFY_ACCOUNT: `${prefixUserServices}${prefixSecondVerson}/authentication/verify-account`,
  REFRESH_TOKEN: `${prefixUserServices}${prefixSecondVerson}/authentication/refresh-token`,
};

const endpointInformation = {
  GET_ALL_SCHOOL: `${prefixDocumentServices}${prefixFirstVersion}/information/schools`,
  GET_ALL_CITY_SCHOOL: (cityId: number) =>
    `${prefixDocumentServices}${prefixFirstVersion}/information/provice/${cityId}/schools`,
  GET_ALL_CITIES: `${prefixDocumentServices}${prefixFirstVersion}/information/provinces`,
};

const endpointUser = {
  GET_AUTHOR: `${prefixUserServices}${prefixFirstVersion}/users/author`,
  GET_AUTHOR_BY_ID: (authorId: string) =>
    `${prefixUserServices}${prefixFirstVersion}/users/author/${authorId}`,
  CHECK_USER_NAME: `${prefixUserServices}${prefixFirstVersion}/users/checkusername`,
  UPDATE_BASE_USER: `${prefixUserServices}${prefixFirstVersion}/users/baseuser`,
  COMPLETE_ONBOARD: (userId: string) =>
    `${prefixUserServices}${prefixFirstVersion}/users/newuser/${userId}`,
  PROFILE_USER: (username: string) =>
    `${prefixUserServices}${prefixFirstVersion}/users/infor/${username}`,
  USER_FLASHCARD: (username: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/flashcard/user/${username}`,
  OWNER_FLASHCARD: `${prefixDocumentServices}${prefixFirstVersion}/flashcard/user`,
  ORIENTATION_STATUS: `${prefixUserServices}${prefixFirstVersion}/users/personalityTestStatus`,
  PROGRESS_STATE: `${prefixUserServices}${prefixFirstVersion}/users/progressStage`,
  CACHE_PERSONALITY: `${prefixUserServices}${prefixFirstVersion}/users/cachePersonality`,
  REPORT: `${prefixUserServices}${prefixFirstVersion}/reports`,
  GET_USER: `${prefixUserServices}${prefixFirstVersion}/users`,
  UPDATE_STATUS_USER: `${prefixUserServices}${prefixFirstVersion}/users/status`,
  GET_USER_DETAIL: (userId: string) =>
    `${prefixUserServices}${prefixFirstVersion}/users/infor/${userId}`,
  UPDATE_USER: `${prefixUserServices}${prefixFirstVersion}/users/baseuser`,
  CREATE_USER: `${prefixUserServices}${prefixFirstVersion}/users/createaccount`,
};

const endpointFolder = {
  CREATE_FOLDER: `${prefixDocumentServices}${prefixFirstVersion}/folders`,
  GET_USER_FOLDER: `${prefixDocumentServices}${prefixFirstVersion}/folders`,
  GET_FOLDER_DETAIL: `${prefixDocumentServices}${prefixFirstVersion}/folders/flashcards`,
  ADD_TO_FOLDER: (folderId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/folders/${folderId}/add`,
  UPDATE_FOLDER: (folderId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/folders/${folderId}`,
  DELETE_FOLDER: (folderId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/folders/${folderId}`,
  REMOVE_FLASHCARD: (flashcardId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/folders/flashcards/${flashcardId}`,
  REMOVE_DOCUMENT: (documentId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/folders/documents/${documentId}`,
};

const endpointUserPersonalized = {
  RECENT_VIEW: `${prefixAnalyseServices}${prefixFirstVersion}/recent-view`,
  GET_RECOMMENED: `${prefixDocumentServices}${prefixFirstVersion}/data/recommended`,
};

const endpointFlashcard = {
  GET_TOP_FLASHCARD: `${prefixDocumentServices}${prefixFirstVersion}/flashcard/top`,
  DRAFT: `${prefixDocumentServices}${prefixFirstVersion}/flashcard/draft`,
  RELATED: `${prefixDocumentServices}${prefixFirstVersion}/flashcard/related`,
  GET_BY_SLUG: (slug: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/flashcard/slug/${slug}`,
  GET_BY_ID: (id: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/flashcard/${id}`,
  CREATE_FLASHCARD_FROM_DRAFT: (id: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/flashcard/created/${id}`,
  EDIT_SET: (id: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/flashcard/${id}`,
  DELETE: (flashcardId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/flashcard/${flashcardId}`,
};

const endpointFlashcardContent = {
  GET_LIST_BY_SLUG: (slug: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/flashcard/slug/${slug}/contents`,
  GET_LIST_BY_ID: (id: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/flashcard/${id}/contents`,
  EDIT_CONTENT: (flashcardId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/flashcard/${flashcardId}/content`,
  CREATE_CONTENT: (flashcardId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/flashcard/${flashcardId}/content`,
  CREATE_CONTENTS: (flashcardId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/flashcard/${flashcardId}/contents`,
  UPDATE_CONTENTS_BY_ID: (flashcardId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/flashcard/${flashcardId}/contents`,
  REORDER_TERM: (flashcardContentId: string, newRank: number) =>
    `${prefixDocumentServices}${prefixFirstVersion}/flashcard/content/${flashcardContentId}/rank/${newRank}`,
  DELETE: ({
    flashcardId,
    flashcardContentId,
  }: {
    flashcardId: string;
    flashcardContentId: string;
  }) =>
    `${prefixDocumentServices}${prefixFirstVersion}/flashcard/${flashcardId}/contents/${flashcardContentId}`,
};

const endpointCourse = {
  GET_COURSES: `${prefixDocumentServices}${prefixFirstVersion}/subjects`,
  GET_BY_SLUG: (slug: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/subject/slug/${slug}`,
  ENROLL_COURSE: ({
    subjectId,
    curriculumId,
  }: {
    subjectId: string;
    curriculumId: string;
  }) =>
    `${prefixDocumentServices}${prefixFirstVersion}/enroll?subjectId=${subjectId}&curriculumId=${curriculumId}`,
  UNENROLL_COURSE: ({
    subjectId,
    curriculumId,
  }: {
    subjectId: string;
    curriculumId: string;
  }) =>
    `${prefixDocumentServices}${prefixFirstVersion}/unenroll?subjectId=${subjectId}&curriculumId=${curriculumId}`,
};

const endpointMBTI = {
  GET_MBTI_TEST: `${prefixUserServices}${prefixFirstVersion}/mbti`,
  SUBMIT_MBTI: `${prefixUserServices}${prefixFirstVersion}/mbti`,
  UPDATE_STUDENT_MBTI: (mbtiType: string) =>
    `${prefixUserServices}${prefixFirstVersion}/users/student/mbti/${mbtiType}`,
};

const endpointHolland = {
  GET_HOLLAND_TEST: `${prefixUserServices}${prefixFirstVersion}/holland`,
  GET_STUDENT_HOLLAND: `${prefixUserServices}${prefixFirstVersion}/users/student/hollandType`,
  SUBMIT_HOLLAND: `${prefixUserServices}${prefixFirstVersion}/holland`,
  UPDATE_STUDENT_HOLLAND: (hollandType: string) =>
    `${prefixUserServices}${prefixFirstVersion}/users/student/holland/${hollandType}`,
};

const endpointFlashcardLearn = {
  POST_PROGRESS: `${prefixDocumentServices}${prefixFirstVersion}/feature/flashcard/progress`,
  GET_LEARN_SET: (flashcardId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/feature/flashcard/${flashcardId}/study`,
  GET_LEARN_PROGRESS: (flashcardId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/feature/flashcard/${flashcardId}/progress`,
  RESET_PROGRESS: (flashcardId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/feature/flashcard/${flashcardId}/reset-progress`,
};

const endpointChapter = {
  GET_CHAPTERS: (courseSlug: string, curriculumId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/chapter/subject/slug/${courseSlug}/curriculum/${curriculumId}`,
};

const endpointLesson = {
  GET_LESSONS: (chapterId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/chapter/${chapterId}/lessons`,
  GET_LESSON_DETAIL: (lessonId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/chapter/lesson/${lessonId}`,
  FINISH_LESSON: (lessonId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/enrollProgress/${lessonId}`,
};

const endpointCareerGuidance = {
  GET_BRIEF: `${prefixUserServices}${prefixFirstVersion}/users/brief?isHardCode=true`,
  GET_RECOMMEND_MAJOR: `${prefixUserServices}${prefixFirstVersion}/users/recommendMajor`,
};

const endpointData = {
  GET_RECOMMEND_DATA: `${prefixDocumentServices}${prefixFirstVersion}/data/recommended`,
};

const endpointRoadmap = {
  GET_USER_ROADMAP: `${prefixUserServices}${prefixFirstVersion}/users/roadmap`,
  GET_NODE_RESOURCE: (resourceId: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/roadmap/node/data/${resourceId}`,
  RELATED_SUBJECT_BY_IDS: `${prefixDocumentServices}${prefixFirstVersion}/subject/related/ids`,
  RELATED_DOCUMENT_BY_IDS: `${prefixDocumentServices}${prefixFirstVersion}/document/related/ids`,
};

const endpointSearch = {
  SEARCH: `${prefixAnalyseServices}${prefixFirstVersion}/search`,
};

const endpointQuiz = {
  GET_QUIZ: `${prefixDocumentServices}${prefixFirstVersion}/questions/quiz`,
  SUBMIT_QUIZ: `${prefixDocumentServices}${prefixFirstVersion}/questions/quiz/submit`,
};

const endpointUniversity = {
  GET_UNI_LIST: `${prefixUserServices}${prefixFirstVersion}/university`,
};
const endpointCurriculum = {
  GET: `${prefixDocumentServices}${prefixFirstVersion}/curriculum`,
};

const endpointCategory = {
  GET_ALL_CATEGORIES: `${prefixDocumentServices}${prefixFirstVersion}/categories`,
};

const endpointDocument = {
  GET_DOCUMENTS: `${prefixDocumentServices}${prefixFirstVersion}/documents/advance`,
  GET_BY_SLUG: (slug: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/document/slug/${slug}`,
};

const endpointDocumentMedia = {
  GET_DOCUMENT: (documentId: string) =>
    `${prefixMediaServices}${prefixFirstVersion}/document/${documentId}`,
  UP_LOAD: (documentId: string) =>
    `${prefixMediaServices}${prefixFirstVersion}/document/${documentId}`,
  DOWNLOAD_DOCUMENT: (documentId: string) =>
    `${prefixMediaServices}${prefixFirstVersion}/document/download/${documentId}`,
};

const endpointNews = {
  GET_HOT_NEWS: `${prefixMediaServices}${prefixFirstVersion}/hotnews`,
  GET_POPULAR_NEWS: `${prefixMediaServices}${prefixFirstVersion}/popularnews`,
  GET_NEWS: `${prefixMediaServices}${prefixFirstVersion}/news`,
  GET_NEW_SLUG: (slug: string) =>
    `${prefixMediaServices}${prefixFirstVersion}/new/slug/${slug}`,
  GET_AUTHOR_NEW: (authorId: string) =>
    `${prefixMediaServices}${prefixFirstVersion}/new/authorId/${authorId}`,
  GET_RELATED_NEW: (newTagId: string) =>
    `${prefixMediaServices}${prefixFirstVersion}/relatednews/${newTagId}`,
};

const endpointGame = {
  CHECK_ROOM: `${prefixGameServices}${prefixFirstVersion}/games/check-room`,
  JOIN_ROOM: `${prefixGameServices}${prefixFirstVersion}/games/join-room`,
  CREATE_ROOM: `${prefixGameServices}${prefixFirstVersion}/games/create-room`,
};

const endpointKet = {
  GET_KETS: `/kets`,
  GET_KETS_CATEGORY: `/kets/categories`,
};

const endPointOccupation = {
  GET_OCCUPATIONS: `${prefixUserServices}${prefixFirstVersion}/occupation`,
  CREATE_OCCUPATION: `${prefixUserServices}${prefixFirstVersion}/occupation`,
  UPDATE_OCCUPATION: (occupationId: string) =>
    `${prefixUserServices}${prefixFirstVersion}/occupation/${occupationId}`,
  DELETE_OCCUPATION: (occupationId: string) =>
    `${prefixUserServices}${prefixFirstVersion}/occupation/${occupationId}`,
};

const endPointMajor = {
  GET_MAJOR: `${prefixUserServices}${prefixFirstVersion}/major`,
  GET_MAJOR_NAME: `${prefixUserServices}${prefixFirstVersion}/major/name`,
  CREATE_MAJOR: `${prefixUserServices}${prefixFirstVersion}/major`,
  UPDATE_MAJOR: (majorId: string) =>
    `${prefixUserServices}${prefixFirstVersion}/major/${majorId}`,
  DELETE_MAJOR: (majorId: string) =>
    `${prefixUserServices}${prefixFirstVersion}/major/${majorId}`,
  GET_MAJOR_CATEGORY: `${prefixUserServices}${prefixFirstVersion}/majorCategory`,
  GET_MAJOR_CATEGORY_NAME: `${prefixUserServices}${prefixFirstVersion}/majorCategory/name`,
  CREATE_MAJOR_CATEGORY: `${prefixUserServices}${prefixFirstVersion}/majorCategory`,
  UPDATE_MAJOR_CATEGORY: (majorCategoryId: string) =>
    `${prefixUserServices}${prefixFirstVersion}/majorCategory/${majorCategoryId}`,
  DELETE_MAJOR_CATEGORY: (majorCategoryId: string) =>
    `${prefixUserServices}${prefixFirstVersion}/majorCategory/${majorCategoryId}`,
};

export {
  endPointMajor,
  endPointOccupation,
  endpointKet,
  endpointUploadImage,
  endpointGame,
  endpointNews,
  endpointDocumentMedia,
  endpointDocument,
  endpointCategory,
  endpointCurriculum,
  endpointUniversity,
  endpointQuiz,
  endpointSearch,
  endpointRoadmap,
  endpointData,
  endpointInformation,
  endpointCareerGuidance,
  endpointLesson,
  endpointChapter,
  endpointCourse,
  endpointAuth,
  endpointUser,
  endpointFolder,
  endpointUserPersonalized,
  endpointFlashcard,
  endpointFlashcardContent,
  endpointMBTI,
  endpointHolland,
  endpointFlashcardLearn,
};
