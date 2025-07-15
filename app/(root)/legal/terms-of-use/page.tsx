import { GLOBAL } from 'vieux-carre'
import TermsOfUseRaw from './terms-of-use'

const TermsOfUsePage = () => {
    return (
      <main className={'h-full gap-2 space-y-4 my-8'}>
        <TermsOfUseRaw appName={GLOBAL.APP_NAME} appUrl={GLOBAL.SERVER_URL}  email={GLOBAL.LEGAL.LEGAL_CONTACT} />
      </main>
    )
}

export default TermsOfUsePage