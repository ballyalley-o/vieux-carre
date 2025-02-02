export const join = (...args: string[]): string => {
  return '/' + args.join('/')
}

export const joinServer = (server: string, ...args: string[]): string => {
  return server + '/' + args.join('/')
}