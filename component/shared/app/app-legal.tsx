import Link from 'next/link'
import { transl } from "lib/util"
import { PATH_DIR } from 'config'

const AppLegal = () => {
    return (
      <p className={"text-xs text-gray-500 text-center mt-4"}>
        {transl('legal.agreement_notice_1')}
        <Link href={PATH_DIR.LEGAL.TERMS_OF_USE} className={"underline hover:text-gray-700 mx-1"}>{transl('legal.terms_of_use')}</Link>
        {transl('and.label')}
        <Link href={PATH_DIR.LEGAL.PRIVACY_POLICY} className={"underline hover:text-gray-700 mx-1"}>{transl('legal.privacy_policy')}</Link>
      </p>
    )
}



export default AppLegal