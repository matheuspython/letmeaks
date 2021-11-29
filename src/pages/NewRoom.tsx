import { Link } from 'react-router-dom'

import illustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'

import { DivAuth } from '../styles/auth'
import { Button } from '../components/Botton/'
import { useContext } from 'react'
import { AuthContext } from '../App'

export function NewRoom() {
  const { user } = useContext(AuthContext)
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
          <h1>{user?.name}</h1>
          <h2>criar uma nova sala</h2>    
          <form action="">
            <input
              placeholder="Nome da sala"
              type="text" 
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