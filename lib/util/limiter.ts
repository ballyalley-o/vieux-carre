export const limiter = (text: string, limit: number = 15): string => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text
}