import { nanoid } from "nanoid"

export function generateInviteCode(): string {
    return nanoid(6).toUpperCase()
}