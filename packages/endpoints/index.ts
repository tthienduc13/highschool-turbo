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
    CHECK_USER_NAME: `${prefixUserServices}${prefixFirstVersion}/users/checkusername`,
    UPDATE_BASE_USER: `${prefixUserServices}${prefixFirstVersion}/users/baseuser`,
    COMPLETE_ONBOARD: (userId: string) =>
        `${prefixUserServices}${prefixFirstVersion}/users/newuser/${userId}`,
    PROFILE_USER: (username: string) =>
        `${prefixUserServices}${prefixFirstVersion}/users/infor/${username}`,
    USER_FLASHCARD: (username: string) =>
        `${prefixDocumentServices}${prefixFirstVersion}/flashcard/user/${username}`,
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

export { endpointAuth, endpointUser, endpointFolder };
