import { useContext } from 'react'
import { useHistory } from 'react-router'

import illustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'

import { DivAuth } from '../styles/auth'
import { Button } from '../components/Botton/'

import { auth, firebase } from '../services/firebase'
import { AuthContext } from '../contexts/AuthContext'


export function Home() {
  const history = useHistory();
  const { signWithGoogle, user } = useContext(AuthContext)
  async function handleCreateRoom() {
    if(!user){
      signWithGoogle()
    }
      history.push('/rooms/new')
  }
  

  return (
    <DivAuth id="page-auth">
      <aside>
        <img 
          src={illustration} 
          alt="ilustração simbolizando perguntas e respostas"
        />
      
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>tire duvidas de sua audiencia em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logo} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIcon} alt="Logo do google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">entre em uma sala</div>
          <form action="">
            <input
              placeholder="Digite o código da sala"
              type="text" 
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </DivAuth>
  )
}