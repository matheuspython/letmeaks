import { useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import React, { FormEvent, useState } from 'react'

import { Container } from '../styles/RoomStyles'
import { Button } from '../components/Botton'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuths'
import { database } from '../services/firebase'
type RoomParams = {
  id: string;
}
export function Room() {
  const [newQuestion, setNewQuestion] = useState('')
  const params = useParams<RoomParams>()
  const roomId = params.id;
  const {user} = useAuth()
  async function handleSendQuestion(event: FormEvent){
    event.preventDefault()
    if(newQuestion.trim() === ''){
      return
    }
    if(!user){
      throw new Error("You must be logged in")
    }
    const question = {
      content: newQuestion,
      author:{
        name: user.name,
        avatar: user.avatar
      },
      isHighLighted: false,
      isAnswered: false
    }
    await database.ref(`rooms/${roomId}/questions`).push(question)
  }

  return (
    <Container id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo" />
          <RoomCode code={roomId}/>


        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>sala React</h1>
          <span>4 perguntas</span>
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="O que voce quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
          />
          <div className="form-footer">
            <span>para enviar uma pergunta <button>faça seu login</button></span>
            <Button disabled={!user} type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </Container>
  )
}
