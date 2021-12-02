import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

import illustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'

import { DivAuth } from '../styles/auth'
import { Button } from '../components/Botton/'
import { useAuth } from '../hooks/useAuths'
import { database } from '../services/firebase'

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('');
  async function handleCreateRoom(event: FormEvent){
    event.preventDefault()
    
    
    if(newRoom.trim() === '') {
      return
    }
    const roomRef = database.ref('rooms')
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })
    history.push(`/rooms/${firebaseRoom.key}`)
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
          <h2>criar uma nova sala</h2>    
          <form onSubmit={handleCreateRoom}>
            <input
              placeholder="Nome da sala"
              type="text" 
              value={newRoom}
              onChange={event => setNewRoom(event.target.value)}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            quer entrar em uma sala existente?
            <Link to="/"> Clique aqui</Link>
          </p>
        </div>
      </main>
    </DivAuth>
  )
}