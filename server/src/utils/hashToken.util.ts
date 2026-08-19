import crypto from "crypto"


export function hashToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex")
}


export function generateTemporaryToken(expiryMinutes = 20) {
    const unHashedToken = crypto.randomBytes(32).toString("hex")
    const hashedToken = hashToken(unHashedToken)
    const tokenExpiry = new Date(Date.now() + expiryMinutes * 60 * 1000)

    return { unHashedToken, hashedToken, tokenExpiry }
}