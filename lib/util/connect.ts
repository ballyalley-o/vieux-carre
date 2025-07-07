export const connect = (...args: string[]): string => {
  return '/' + args.join('/')
}

export const connectUrl = (server: string, ...args: string[]): string => {
  return server + '/' + args.join('/')
}