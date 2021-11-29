import { createContext, ReactNode, useEffect, useState } from "react"
import { auth, firebase } from '../services/firebase'

export const AuthContext = createContext({} as AuthContextType)

type AuthContextType = {
  user: User | undefined;
  signWithGoogle: () => Promise<void>;
}

type User = {
  id: string;
  name: string;
  avatar: string;
}
type AuthContextProviderProps = {
  children: ReactNode
}
export function AuthContextProvider(props: AuthContextProviderProps){
  const [user, setUser] = useState<User>()
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if(user){
        const { displayName, photoURL, uid } = user
        
        if(!displayName || !photoURL){
          throw new Error('Missing information from google  account')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
    return () =>{
      unsubscribe()
    }
  },[])

  async function signWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()
    const reponse = await auth.signInWithPopup(provider)
    
      if(reponse.user){
        const { displayName, photoURL, uid } = reponse.user
        
        if(!displayName || !photoURL){
          throw new Error('Missing information from google  account')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
  }
  return(
    <AuthContext.Provider value={{ user, signWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}