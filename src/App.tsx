import { createContext, useState, useEffect } from 'react'
import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { auth, firebase } from './services/firebase'
import { Route, BrowserRouter } from 'react-router-dom'

type AuthContextType = {
  user: User | undefined;
  signWithGoogle: () => Promise<void>;
}

type User = {
  id: string;
  name: string;
  avatar: string;
}

export const AuthContext = createContext({} as AuthContextType)

export function App () {
  const [user, setUser] = useState<User>()
  useEffect(()=>{
    auth.onAuthStateChanged(user =>{
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
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signWithGoogle }}>
        <Route path="/" exact component={Home}/>
        <Route path="/rooms/new" component={NewRoom}/>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}


