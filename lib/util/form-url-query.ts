import qs from "query-string"

type FormUrlQueryType = {
    params: string
    key   : string
    value : string | null
}
export function formUrlQuery({ params, key, value }: FormUrlQueryType) {
    const query = qs.parse(params)
    query[key]  = value
    return qs.stringifyUrl({ url: window.location.pathname, query }, { skipNull: true })
}