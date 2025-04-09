const getCharAtName = (name: string) => name && name.charAt(0).toUpperCase()
const getCharAtSecondName = (name: string) => name && name.split(' ')[1]?.charAt(0).toUpperCase()
export const charAtName = (name: string) => (getCharAtSecondName(name) ? getCharAtName(name) + getCharAtSecondName(name) : getCharAtName(name))
