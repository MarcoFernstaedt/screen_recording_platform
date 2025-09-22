import { createAuthClient } from 'better-auth/react'

export const authCleint = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})