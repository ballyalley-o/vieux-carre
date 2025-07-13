import { GLOBAL } from 'vieux-carre'
import { ASSET_DIR } from 'vc.dir'
import { Html, Head, Preview, Body, Container, Heading, Text, Link, Section, Button, Img, Tailwind } from '@react-email/components'
import { formatText, transl } from 'lib/util'

type ResetPasswordEmailProps = {
  resetLink: string
  year     : number
  siteName : string
}

export default function ResetPasswordEmail({ resetLink, year, siteName }: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{transl('smtp.reset_password.subject', { name: GLOBAL.APP_NAME })}</Preview>
      <Tailwind>
        <Body className={'min-w-[700px] h-[700px] bg-transparent text-gray-500 m-20 items-center align-middle font-sans'}>
          <Container className={'max-w-[600px] my-10 mx-auto bg-[#0E0E0E] border border-[#1D2020] rounded-lg p-10 shadow-lg'}>
            <Section className={'flex justify-center items-center mt-8 gap-2'}>
              <Img src={ASSET_DIR.LOGO_PRODUCTION_PNG} width={'40'} alt="Logo" />
            </Section>
            <Heading className={'font-sans text-2xl items-center flex justify-center my-10'}>
              {transl('smtp.reset_password.title', { name: GLOBAL.APP_NAME })}
            </Heading>
            <Text>{transl('smtp.reset_password.body_1')}</Text>

            <Section className={'text-center my-4'}>
              <Button href={resetLink} className="bg-[#D2D2D2] text-[#050505] py-3 px-6 font-bold rounded text-base no-underline">
                {formatText(transl('smtp.reset_password.button'), 'uppercase')}
              </Button>
            </Section>

            <Text>{transl('smtp.reset_password.body_1')}</Text>
            <Section className={'bg-[#1D2020] text-center text-xs my-2 py-2 px-4 rounded'}>
              <Link href={resetLink} className={'text-tape break-all'}>
                {resetLink}
              </Link>
            </Section>

            <Text>{transl('smtp.reset_password.body_2')}</Text>
          </Container>

          <Text className={'text-center text-xs text-[#999] mt-10'}>
            &copy; {year} {siteName}. {transl('legal.copyright_notice')}
          </Text>
        </Body>
      </Tailwind>
    </Html>
  )
}
