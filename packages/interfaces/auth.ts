export interface UserSession {
  userId: string;
  fullname: string;
  email: string;
  username: string;
  image: string;
  progressStage: string;
  roleName: string;
  lastLoginAt: Date;
  sessionId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

export interface GoogleLoginRequest {
  fullName: string;
  avatar: string;
  accessToken: string;
  email: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}
