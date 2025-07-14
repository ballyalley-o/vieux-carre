import { GLOBAL } from 'vieux-carre'
import PrivacyPolicy from './privacy-policy'

const PrivacyPolicyPage = () => {
    return (
      <main className={'h-full gap-2 space-y-4 my-8'}>
        <PrivacyPolicy updatedDate={GLOBAL.POLICY.PRIVACY_POLICY_UPDATED_DATE} appName={GLOBAL.APP_NAME} />
      </main>
    )
}

export default PrivacyPolicyPage