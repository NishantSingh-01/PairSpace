export interface AuthResult {
    accessToken: string
    refreshToken: string
    user: {
        id: string
        email: string
        username: string
    }
}
export interface RefreshResult {
    accessToken: string
    refreshToken: string
}
export interface TokenPayload {
    userId: string
}