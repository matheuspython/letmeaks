import { useHistory } from 'react-router'

import illustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'

import { DivAuth } from '../styles/auth'
import { Button } from '../components/Botton/'

import { useAuth } from '../hooks/useAuths'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'


export function Home() {
  const [roomCode, setRoomCode] = useState('')
  const history = useHistory();
  const { signWithGoogle, user } = useAuth()
  async function handleCreateRoom() {
    if(!user){
      signWithGoogle()
    }
      history.push('/rooms/new')
  }
  
  async function handleJoinRoom(event: FormEvent){
    event.preventDefault()

    if(roomCode.trim() === ''){
      return
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get()
    if(!roomRef.exists()){
      alert('Room does not exist')
      return
    }
    if(roomRef.val().endedAt){
      alert('room already closed')
      return
    }
    history.push(`/rooms/${roomCode}`)

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
          <form onSubmit={handleJoinRoom}>
            <input
              type="text" 
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
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