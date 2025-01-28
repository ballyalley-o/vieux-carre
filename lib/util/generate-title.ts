import { GLOBAL } from "vieux-carre"

export const generateTitle = (title: string, page?: string) => {
    const SEPARATOR = GLOBAL.TITLE_SEPARATOR
    if (!page) return title
    return  title + SEPARATOR + page
}