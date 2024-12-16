export interface UserSession {
    userId: string;
    fullname: string;
    email: string;
    username: string;
    image: string;
    isNewUser: boolean;
    roleName: string;
    lastLoginAt: Date;
    sessionId: string;
    accessToken: string;
    refreshToken: string;
}

export interface GoogleLoginRequest {
    fullName: string;
    avatar: string;
    accessToken: string;
    email: string;
}
