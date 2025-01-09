import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
// import Modal from './components/modals/Modal'
import ResgisterModal from './components/modals/ResgisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'


export const metadata = {
  title: 'Airbnb',
  description: 'Generated by create next app',
}

const font = Nunito({ subsets: ['latin'] })

export default async function RootLayout({ children }) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>  
          {/* @ts-ignore */}
          <Navbar currentUser={currentUser} />
          <ToasterProvider />
          <LoginModal />
          
          
          <ResgisterModal />
         
         
          <RentModal />
          <SearchModal />
        </ClientOnly>
        <div className='pb-20 pt-28'>
           {children}
        </div>
      </body>
    </html>
  )
}
