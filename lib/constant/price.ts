import { GLOBAL } from "vieux-carre"

const CURRENCY = GLOBAL.PRICES.CURRENCY_SYMBOL

export const PRICE = [
    {
        name : `${CURRENCY}1 to ${CURRENCY}50`,
        value: '1-50'
    },
    {
        name : `${CURRENCY}51 to ${CURRENCY}100`,
        value: '51-100'
    },
    {
        name : `${CURRENCY}101 to ${CURRENCY}200`,
        value: '101-200'
    },
    {
        name : `${CURRENCY}201 to ${CURRENCY}500`,
        value: '201-500'
    },
    {
        name : `${CURRENCY}501 to ${CURRENCY}1000`,
        value: '501-1000'
    }
]