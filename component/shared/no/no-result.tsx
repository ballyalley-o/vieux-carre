import { en } from 'public/locale'

const NoResult = ({ data } : { data: number }) => {
    return (
        data <= 0 && (<div className={'flex justify-center space-y-12'}> <p className={'text-center text-2xl text-muted-foreground'}>{en.zero_results.label}</p></div>)
     );
}

export default NoResult