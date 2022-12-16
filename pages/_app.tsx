import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Login from './login'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../config/firebase'
import Loading from '../components/Loading'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { useEffect } from 'react'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'


export default function App({ Component, pageProps }: AppProps) {

  const [loggedInUser, loading, _error] = useAuthState(auth)

  useEffect(() => {
    const setUserInDb = async () => {
      try {
        await setDoc(
          doc(db, 'users', loggedInUser?.uid as string),
          {
            email: loggedInUser?.email,
            lastSeen: serverTimestamp(),
            photoURL: loggedInUser?.photoURL
          }, {
            merge: true,
          }
        )
      }
      catch(error) {
        console.log(error)
      }
    }
    if(loggedInUser) {
      setUserInDb()
    }
  }, [loggedInUser])


  if (loading) return <Loading/>

  if (!loggedInUser) return <Login />
  return <Component {...pageProps} />
}
