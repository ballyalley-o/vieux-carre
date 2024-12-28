export const join = (...args: string[]): string => {
  return '/' + args.join('/')
}
