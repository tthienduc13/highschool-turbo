const prefixUserServices = "/users-service";
const prefixDocumentServices = "/documents-service";
const prefixDiscussionServices = "/discussion-service";
const prefixMediaServices = "/media-service";
const prefixAnalyseServices = "/analyse-service";

const prefixFirstVersion = "/api/v1";
const prefixSecondVerson = "/api/v2";

const endpointAuth = {
  GOOGLE: `${prefixUserServices}${prefixSecondVerson}/authentication/google`,
  EMAIL: `${prefixUserServices}${prefixSecondVerson}/authentication/login`,
  REFRESH_TOKEN: `${prefixUserServices}${prefixSecondVerson}/authentication/refresh-token`,
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
  ORIENTATION_STATUS: `${prefixUserServices}${prefixFirstVersion}/users/personalityTestStatus`,
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
};

const endpointUserPersonalized = {
  RECENT_VIEW: `${prefixAnalyseServices}${prefixFirstVersion}/recent-view`,
  GET_RECOMMENED: `${prefixDocumentServices}${prefixFirstVersion}/data/recommended`,
};

const endpointFlashcard = {
  GET_TOP_FLASHCARD: `${prefixDocumentServices}${prefixFirstVersion}/flashcard/top`,
  DRAFT: `${prefixDocumentServices}${prefixFirstVersion}/flashcard/draft`,
  GET_BY_SLUG: (slug: string) =>
    `${prefixDocumentServices}${prefixFirstVersion}/flashcard/slug/${slug}`,
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
};

const endpointMBTI = {
  GET_MBTI_TEST: `${prefixUserServices}${prefixFirstVersion}/mbti`,
  SUBMIT_MBTI: `${prefixUserServices}${prefixFirstVersion}/mbti`,
  UPDATE_STUDENT_MBTI: (mbtiType: string) =>
    `${prefixUserServices}${prefixFirstVersion}/users/student/${mbtiType}`,
};

const endpointHolland = {
  GET_HOLLAND_TEST: `${prefixUserServices}${prefixFirstVersion}/holland`,
  GET_STUDENT_HOLLAND: `${prefixUserServices}${prefixFirstVersion}/users/student/hollandType`,
  SUBMIT_HOLLAND: `${prefixUserServices}${prefixFirstVersion}/holland`,
  UPDATE_STUDENT_HOLLAND: (hollandType: string) =>
    `${prefixUserServices}${prefixFirstVersion}/users/student/holland/${hollandType}`,
};

export {
  endpointCourse,
  endpointAuth,
  endpointUser,
  endpointFolder,
  endpointUserPersonalized,
  endpointFlashcard,
  endpointFlashcardContent,
  endpointMBTI,
  endpointHolland,
};
