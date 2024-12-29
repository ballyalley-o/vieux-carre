import { GLOBAL } from 'config'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="border-t">
      <div className="p-5 flex-center">
        {currentYear} &copy; {GLOBAL.APP_NAME}. All rights reserved
      </div>
    </footer>
  )
}

export default Footer
