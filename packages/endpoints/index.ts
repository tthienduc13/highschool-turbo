const prefixUserServices = "/users-service";
const prefixDocumentServices = "/documents-service";
const prefixDiscussionServices = "/discussion-service";
const prefixMediaServices = "/media-service";
const prefixAnalyseServices = "/analyse-service";

const prefixVersion = "/api/v1";
const prefixSecondVerson = "/api/v2";

const endpointAuth = {
    GOOGLE: `${prefixUserServices}${prefixSecondVerson}/authentication/google`,
    EMAIL: `${prefixUserServices}${prefixSecondVerson}/authentication/login`,
    REFESH_TOKEN: `${prefixUserServices}${prefixSecondVerson}/authentication/refresh-token`,
};

export { endpointAuth };
