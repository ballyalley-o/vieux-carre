interface IMaxAge {
  one_sec : number
  five_sec: number
  one_min : number
  ten_min : number
  one_hr  : number
  two_hr  : number
  six_hr  : number
  1       : number
  2       : number
  15      : number
  30      : number
}

/**
 * @description maxAge in milliseconds
 * @property {number} five_sec - 5 seconds
 * @property {number} ten_min - 10 minutes
 * @property {number} one_hr - 1 hour
 * @property {number} two_hr - 2 hours
 * @property {number} six_hr - 6 hours
 * @property {number} 1 - 1 day
 * @property {number} 2 - 2 days
 * @property {number} 15 - 15 days
 * @property {number} 30 - 30 days
 * @returns {IMaxAge}
 */
const maxAge: IMaxAge = {
  one_sec : 1000,
  five_sec: 5 * 1000,
  one_min : 60 * 1000,
  ten_min : 10 * 60 * 1000,
  one_hr  : 60 * 60 * 1000,
  two_hr  : 2 * 60 * 60 * 1000,
  six_hr  : 6 * 60 * 60 * 1000,
  1       : 24 * 60 * 60 * 1000,
  2       : 2 * 24 * 60 * 60 * 1000,
  15      : 15 * 24 * 60 * 60 * 1000,
  30      : 30 * 24 * 60 * 60 * 1000
}

const expire      = new Date(0)
const oneSec      = maxAge.one_sec
const fiveSec     = maxAge.five_sec
const oneMin      = maxAge.one_min
const tenMin      = maxAge.ten_min
const oneHr       = maxAge.one_hr
const twoHr       = maxAge.two_hr
const sixHr       = maxAge.six_hr
const oneDay      = maxAge[1]
const twoDays     = maxAge[2]
const fifteenDays = maxAge[15]
const thirtyDays  = maxAge[30]

const fromNow = (time: number) => new Date(Date.now() + time)

const fiveSecFromNow     = fromNow(fiveSec)
const tenMinFromNow      = fromNow(tenMin)
const oneHrFromNow       = fromNow(oneHr)
const twoHrFromNow       = fromNow(twoHr)
const sixHrFromNow       = fromNow(sixHr)
const oneDayFromNow      = fromNow(oneDay)
const twoDaysFromNow     = fromNow(twoDays)
const fifteenDaysFromNow = fromNow(fifteenDays)
const thirtyDaysFromNow  = fromNow(thirtyDays)

export {
  expire,
  oneSec,
  fiveSecFromNow,
  tenMin,
  tenMinFromNow,
  oneMin,
  oneHr,
  twoHr,
  sixHr,
  oneDay,
  thirtyDays,
  oneHrFromNow,
  twoHrFromNow,
  sixHrFromNow,
  oneDayFromNow,
  twoDaysFromNow,
  fifteenDaysFromNow,
  thirtyDaysFromNow
}
