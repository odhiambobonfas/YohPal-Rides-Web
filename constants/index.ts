const COOKIES = {
    Session: "__auth",
    EmailNotVerified: "__emailVerified",
    User: "__u",
} as const

const DEBUG_BUILD = process.env.NODE_ENV === "development"
export { COOKIES, DEBUG_BUILD }
