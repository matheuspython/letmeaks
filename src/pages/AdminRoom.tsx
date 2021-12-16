import { useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import React, { FormEvent, useEffect, useState } from 'react'

import { Container } from '../styles/RoomStyles'
import { Button } from '../components/Botton'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuths'
import { database } from '../services/firebase'
import Question from '../components/Question'
import { useRoom } from '../hooks/useRoom'




type RoomParams = {
  id: string;
}
export function AdminRoom() {
  const [newQuestion, setNewQuestion] = useState('')
  const params = useParams<RoomParams>()
  const roomId = params.id;
  const { user } = useAuth()
  const {questions, title} = useRoom(roomId)




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
    setNewQuestion("")
  }

  return (
    <Container id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo" />
          <div>
            <RoomCode code={roomId}/>
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>sala {title}</h1>
          { questions.length > 0 && <span>{questions.length } pergunta(s)</span> }
        </div>
     
        <div className="question-list">
          {questions.map(question =>{
            return(
              <Question 
                key={question.id}
                content={question.content}
                author={question.author}    
              />
            )
          })}
        </div>
      </main>
    </Container>
  )
}
